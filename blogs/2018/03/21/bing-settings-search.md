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

Have you ever had trouble finding a certain setting in VS Code? Maybe you don't know when to look for "suggestions" or "completions" versus "intellisense". Maybe you have trouble spelling "beautify". Maybe you want to move the file explorer over to the right side of the window, and just can't find the right words to use. You're not alone. We have heard from many frustrated users out there on Github, StackOverflow, and elsewhere who just can't get VS Code set up the way they want. In our 1.20 release at the beginning of February, we released an improved version of settings search, powered by Bing.

Being a highly customizable editor has a cost - VS Code includes more than 400 settings out of the box, and if you include settings contributed by extensions, especially certain extensions (I'm looking at you, GitLens!) many users can have significantly more available. We have about 3,000 new users trying VS Code for the first time every day [Is this right? Can't read my notes] and it's important to us that they don't get discouraged when trying to customize VS Code for the first time.

## An earlier attempt at improvement

When we introduced the redesigned settings editor more than a year ago, we made browsing and filtering the available settings much easier. Where previously you had to use the editor's find widget to search for an exact string of text in our list of default settings, now it would find settings matching the words of your query, in any order. We thought this would make it easier for people to find settings, but we had to get it in front of real people to know for sure.

When introducing new VS Code features, we often run user studies on usertesting.com. This is a system that helps us find people who haven't used VS Code but could be potential users, and essentially watch over their shoulders as they attempt to use the new feature. Users record their screens and voice for a session of 20-30 minutes while they work through a set of scenarios in a script that we've provided. In this case we wanted to find out whether the users could customize some aspect of their editor without knowing which setting they're looking for, so we didn't describe the goal in a way that would prime them with keywords - instead we just gave before and after screenshots and asked them to figure out how to make the change.

The results showed what we'd expected - while having a nicer search UI in the settings editor was a plus, many users still had trouble finding the settings they needed. We had made search a little more flexible, but that would only go so far when users aren't familiar with all of our terminology. So that was when we turned to Microsoft's search experts - the Bing team. Our goals aligned with Bing's "Infuse AI" initiative, the target of which is to bring the capabilities of Bing into another product by creating an intelligent custom search service.

## Working with the Bing team

Early discussions included a range of ideas on how to improve outcomes for our users. We discussed VS Code-specific results on bing.com, or web results included on the settings search page inside VS Code itself. But we decided on an arrangement in which the Bing team would run a settings search service that would provide intelligent fuzzy settings matches for queries that users search for in the settings editor.

We are a relatively small development team, and we knew that if we were to start maintaining a service like this, we would not be able to spend a lot of time managing it manually. So we built a fully automated system that is updating the indexed settings for each of our daily Insiders builds with no human interaction. Within minutes of the completion of the build, Bing's index has been updated to include any newly added settings. Bing is also crawling all extensions published in the marketplace and indexing details of their contributed settings, so it can provide results for a user's extension settings as well.

The collected settings data then goes through an “alternative word” generation pipeline. This pipeline collects words with similar intents to enrich the indexes. These words are collected from Bing search data using signals like user behavior, clicks, online ranking, page similarity, etc. Cortana Natural Language Processing pipelines are used to collect commonly used speech and text patterns, and these are also added to the index. Light[weight?] customized versions of common Bing Services such as the Bing Speller and Stemmer are also created for the collected settings data.

We can even make manual changes to the results by adding alternative words or boosting results for certain queries. This feedback is incorporated into the live service and reflected in the results instantly.

When you do a search in the settings editor, we still filter the settings locally with your query, as we did before. But we also send the query to Bing's settings search service, and show any setting matches that it finds.

While developing this system, we needed a way to quantitatively evaluate the results. We decided to build a test system based on the concept of [Normalized Discounted Cumulative Gain, or NDCG](https://en.wikipedia.org/wiki/Discounted_cumulative_gain). Without getting into the details, this is a way to grade the results from a search engine, given a query, a set of results, and scores for those results. We wrote quite a few test cases by hand, but realized that we needed an automated way to generate test cases for all settings, including new settings as they would be added, and settings in extensions. So we wrote a tool that can generate test cases automatically for any setting. It uses words from the setting name and description, and runs them through different transformers that simulate users choosing alternate words, making typos, or searching using natural language patterns. We also generated test cases for settings from some popular extensions.

We run the full test suite every 6 hours, and it can update itself automatically so that it's always testing settings from the latest build. The test suite assures us that the system is running properly, and gives us confidence that when we make changes on the backend, we are not hurting the result quality.

## Intelligent settings search

So now it should be easier to find settings. If you search `"change the font"`, you'll find the font settings. If you want to "turn off that tiny code overview thing", you'll find `"editor.minimap.enabled"`. And if you can't figure out how to "move explorer to right", you'll find `"workbench.sidebar.location"`. Now go try it out, and please file issues on Github if you don't see the results that you expect. In fact, if you're using [VS Code Insiders](https://code.visualstudio.com/insiders/) you will even see a button that will invoke our new issue reporter to make it easier for you to file an issue that includes all the details we need.

Happy Coding!

Rob ([@roblourens](https://twitter.com/roblourens))