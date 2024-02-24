# YouTube Channel Stats Webpage

## Description
The YouTube Channel Stats Webpage fetches and displays statistics for a YouTube channel, including subscribers, views, and videos. This also shows the channel icon and banner.

## Getting Started
To get started with the YouTube Channel Stats App, follow these steps:

### Prerequisites
- Node.js installed
- npm package manager

### Installation
1. Clone the repository or copy and paste to glitch or anywhere.
2. Make sure you add the YouTube api to your env file
3. Run!

### Usage
1. go to localhost in a web browser.
2. Enter the YouTube channel ID or username in the input field.
3. Click the "Get Channel Stats" button or press enter to retrieve and display the channel statistics.

## The Journey
I was going to do something completely different but I had a cool idea.  

So I wanted to make a webpage but I quickly realized a security flaw with the api key.  
The api key could be easily found and quickly taken away from me...  

So I got express as the backend server to process the api requests and keep my api key safe!  
The only problem is that I don't know how to do this even though I been using express and html but never together  
After a few tears, I managed to find a way to get it to work and the backend server sends a json to the html and that gets modifed to the page  

Smooth sailing... Nope I wanted to add a animation for the subscriber, views, and video count  
So that it starts at zero and counts to the end number  
I got it to work after a bit but for some reason the commas was not working. Turns out I was trying to add commas to a string.

Okay finally time to make everything clean
Only issue is that CSS hates me! (not really but it is something to play with to get something to look good)
After playing around a bit, I finally got something that I liked

Now I need to write an readme and I also never made one before so this is new to me.  
Hopefully this looks nice...  

The end!
