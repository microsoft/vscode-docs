---
Order: 37
TOCTitle: Settings Search
PageTitle: Settings search - now powered by Bing
MetaDescription: Settings search - now powered by Bing
MetaSocialImage:
Date: 2018-03-21
ShortDescription: Learn what's new with settings search in Visual Studio Code
Author: Rob Lourens
---
# Settings search - now powered by Bing

Last month, we released an improvement to settings search in VS Code. We have tweaked our settings editor many times in the past, but this was different - it was our first large-scale collaboration with another team, and the first experience that our team had with managing and depending on an external service to power a core feature. Now each time you search for settings, you will see intelligent results powered by Bing.

Being a highly customizable editor has a cost - VS Code includes more than 400 settings out of the box, and if you include settings contributed by extensions, especially certain extensions (I'm looking at you, GitLens!) many users can have significantly more available. We have about 30,000 new users trying VS Code for the first time every day, and it's important to us that they don't get discouraged when trying to customize VS Code for the first time.

Looking across StackOverflow, Github issues, Twitter, as well as user studies that we did on usertesting.com, and our internal settings search telemetry, we've seen many users having issues finding settings. We've seen users who just didn't know which words to use to describe a certain feature. We've seen users making typos and misspellings. And we've seen many other queries which just didn't fit into the strict filtering model that we had previously implemented for searching settings. The problem is with the long tail of queries. There are a large number of users making simple common queries, like "font", which we can handle perfectly well. But there is also a very long tail of less common queries which don't produce literal matches, and which we can't understand without some extra intelligence. So several months ago, we started talking to Microsoft's search experts - the Bing team. Our goals aligned with Bing's "Infuse AI" initiative, the target of which is to bring the capabilities of Bing into another product by creating an intelligent custom search service.

## Working with the Bing team

Early discussions included a range of ideas on how to improve outcomes for our users. We discussed VS Code-specific results on bing.com, or web results included on the settings search page inside VS Code itself. But we decided on an arrangement in which the Bing team would run a settings search service that would provide intelligent fuzzy settings matches for queries that users search for in the settings editor.

We are a relatively small development team, and we knew that if we were to start maintaining a service like this, we would not be able to spend a lot of time managing it manually. So we built a fully automated system that is updating the indexed settings for each of our stable release builds and our daily Insiders builds with no human interaction. Within minutes of the completion of the build, Bing's index has been updated to include any newly added settings.

The first change we had to make was to introduce a unique version number for each build, so that the VS Code client can request results for its build version. Our stable release builds have a unique version number, but Insider builds don't. We wanted to define a monotonically increasing build number that could be computed independently for each build, rather than complicating our processes by adding a new incrementing version number for each Insiders release. So during the build, we generate a number based on the previous release tag plus the number of commits since that release, and bake that number into the product.

During the build, VS Code starts up in a mode where it writes all of its configuration to a JSON file. We have to actually start VS Code, because we can't determine all the configuration metadata statically. The file includes a few pieces of information per setting - the name, description, type, default value, and for "enum"-type settings, the list of valid values and their descriptions. We then upload the file to Azure Storage. If you're curious, you can see the latest one here: https://ticino.blob.core.windows.net/configuration/122001350/6c22e21cdcd6811770ddcc0d8ac3174aaad03678/configuration.json. 122001350 is the unique build number, as discussed above. 6c22e21cd... is the git commit that the build was built off of. And Ticino, some of you diehard fans might remember, was our original short-lived code name.

## Backend

Bing's service watches the Azure Storage container, notices a new build, and indexes it immediately. At the same time, Bing is constantly crawling the VS Code extension marketplace, waiting for extension updates and new extensions. When it finds one, it downloads its package.json (for extensions, all configuration metadata is contained in the package.json. No need to start it up.) and indexes its settings in the same way as VS Code's.

Several things must happen to get from indexing a pile of settings to serving up useful search results. Here's a high level view of the backend:

[Ankith's diagram]

In order to handle user queries that use different words to the words actually used by settings, we integrated Bing's "alternative word" generation pipeline. This pipeline collects words with similar meanings to each other from Bing's indexed search data using signals such as user behavior, clicks, online ranking, and page similarity. For example, "update" and "upgrade" are set as "alternative words", and a search for one will return settings that include the other.

We used the Speller and Stemmer Pipeline to handle queries that contain misspellings or alternate forms of the same word stem. For example "formatted", "formatter", "format" - all will be indexed for a setting that uses the word "formatting". [More here]

We also want to enable users to describe their query in their own natural language, so we added Cortana's Natural Language Processing pipeline. It collects [from where?] commonly used speech and text patterns, and these are also added to the index. This enables a user to search `"how to change default file encoding"` to find `"files.encoding"`.

When a request is received, they do a fuzzy lookup in the index. The results are ranked by XYZ.

We can even make manual changes to the results by adding alternative words or boosting results for certain queries. This feedback is incorporated into the live service and reflected in the results instantly.

The service is deployed to georeplicated servers located around the world. Search queries are sent to a load balancing service that decides which server should handle the request, based on how physical proximity and current load of the server. [How does that work, where is the load balancer located?]

## Testing

While developing this system, we needed a way to quantitatively evaluate the results. We decided to build a test system based on the concept of [Normalized Discounted Cumulative Gain, or NDCG](https://en.wikipedia.org/wiki/Discounted_cumulative_gain). Without getting into the details, this is a way to grade the results from a search engine, given a query, a set of results, and scores for those results. We wrote quite a few test cases by hand, but realized that we needed an automated way to generate test cases for all settings, including new settings as they would be added, and settings in extensions. So we wrote a tool that can generate test cases automatically for any setting. It uses words from the setting name and description, and runs them through different transformers that simulate users choosing alternate words, making typos, or searching using natural language patterns. We also generated test cases for settings from some popular extensions.

We run the full test suite every 6 hours, and it can update itself automatically so that it's always testing settings from the latest build. The test suite assures us that the system is running properly, and gives us confidence that when we make changes on the backend, we are not hurting the result quality.

## Future Work

There are several ways that we can continue to improve the system. For example, we are also setting up an automated feedback loop based on user behavior. If many people search for similar queries, then pick the same result, we know that result is probably a good one and should be ranked higher.

Currently the service is only indexing in English, but we'd like to index the translated setting descriptions and support searching in non-English languages. There is also some configuration metadata that isn't currently indexed, like possible values for the `"workbench.colorCustomizations"` setting. And taking search a little further, we would like to show results for extensions that aren't currently installed. If you search `"debug python"`, and don't have strong matches for local settings, then we would like to lead you towards an extension that can help you debug Python code. We have also thought about other applications for this technology within VS Code. Maybe the command palette could be powered by a similar service.

## Intelligent settings search

So now it should be easier to find settings. If you search `"change the font"`, you'll find the font settings. If you want to "turn off that tiny code overview thing", you'll find `"editor.minimap.enabled"`. And if you can't figure out how to "move explorer to right", you'll find `"workbench.sidebar.location"`. Now go try it out, and please file issues on Github if you don't see the results that you expect. In fact, if you're using [VS Code Insiders](https://code.visualstudio.com/insiders/) you will even see a button that will invoke our new issue reporter to make it easier for you to file an issue that includes all the details we need.

Happy Coding!

Rob ([@roblourens](https://twitter.com/roblourens))