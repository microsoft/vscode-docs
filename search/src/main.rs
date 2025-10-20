use fst::{IntoStreamer, Map, MapBuilder};
use markdown::mdast;
use rake::{Rake, StopWords};
use regex;
use regex_automata::dense;
use std::fs::File;
use std::io;

fn get_text(node: &mdast::Node) -> String {
    match node {
        mdast::Node::Root(r) => r
            .children
            .iter()
            .map(|child| get_text(child))
            .collect::<Vec<_>>()
            .join("\n\n"),
        mdast::Node::Text(t) => t.value.clone(),
        mdast::Node::Strong(e) => e
            .children
            .iter()
            .map(|child| get_text(child))
            .collect::<Vec<_>>()
            .join(" "),
        mdast::Node::Emphasis(e) => e
            .children
            .iter()
            .map(|child| get_text(child))
            .collect::<Vec<_>>()
            .join(" "),
        mdast::Node::Paragraph(p) => p
            .children
            .iter()
            .map(|child| get_text(child))
            .collect::<Vec<_>>()
            .join(""),
        _ => String::new(),
    }
}

fn main() -> Result<(), Box<dyn std::error::Error>> {
    let args: Vec<String> = std::env::args().collect();
    let search_term = args.get(1).expect("Please provide a search term");

    let raw = std::fs::read_to_string("../docs/remote/wsl.md")?;

    let root = markdown::to_mdast(&raw, &markdown::ParseOptions::default()).unwrap();

    let text = get_text(&root);
    std::fs::write("out.txt", &text)?;

    let sw: StopWords = StopWords::from_file("english.stop")?;
    let r = Rake::new(sw);
    let keywords = r.run(&text);
    // let keywords = keywords.into_iter().map(|k| k.keyword).collect::<Vec<_>>();

    // sort lexicographically
    let mut keywords = keywords.into_iter().collect::<Vec<_>>();
    keywords.sort_by(|a, b| a.keyword.cmp(&b.keyword));

    // for k in &keywords {
    //     println!("{}: {}", k.keyword, k.score);
    // }

    println!("Extracted {} keywords", keywords.len());

    let wtr = io::BufWriter::new(File::create("map.fst")?);
    let mut build = MapBuilder::new(wtr)?;

    for kw in &keywords {
        build.insert(kw.keyword.clone(), kw.score.to_bits())?;
    }

    // Finish construction of the map and flush its contents to disk.
    build.finish()?;

    // let set = Set::from_iter(keywords.iter().map(|ks| ks.as_str()))?;
    let raw_map = std::fs::read("map.fst")?;
    let map = Map::new(raw_map)?;

    let pattern = format!(r"(?i).*{}.*", regex::escape(search_term));
    // Setting 'anchored' is important, otherwise the regex can match anywhere
    // in the key. This would cause the regex to iterate over every key in the
    // FST set.
    let dfa = dense::Builder::new()
        .anchored(true)
        .build(&pattern)
        .unwrap();

    let mut result = map
        .search(&dfa)
        .into_stream()
        .into_str_vec()?
        .into_iter()
        .map(|(key, score)| (key, f64::from_bits(score)))
        .collect::<Vec<_>>();

    result.sort_by(|a, b| a.1.partial_cmp(&b.1).unwrap());

    println!("Found {} results matching '{}'", result.len(), pattern);
    for (key, score) in &result {
        println!("{}, {}", key, score);
    }

    Ok(())
}
