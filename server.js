//get packages
const express = require("express");
const axios = require("axios");
const app = express();
const port = 3000;

// Serve static files from the 'public' directory
app.use(express.static("public"));

// Define a route to fetch channel statistics
app.get("/channel-stats", async (req, res) => {
  try {
    //put your YouTube key here
    //you should really use the .env set KEY={yourkey} and not touch this
    const apiKey = process.env.KEY;
    const input = req.query.channelId;

    //if user does not insert anything and press enter you tell them
    if (!input) {
      return res
        .status(400)
        .json({ error: "Channel ID or Username is required." });
    }

    //we need to check if the user inserted an id or channel name
    var id;
    //if they inserted id
    if (input.startsWith("UC") || input.startsWith("UC_")) {
      id = input;
    } else {
      //we will search for the channel instead of using forUsername because it seems to be a bit inaccurate for some channels
      var search = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResults=1&q=${input}&type=channel&key=${apiKey}`
      );
      //error check if channel does not exist
      if (search.data.pageInfo.totalResults == 0) {
        return res.status(404).json({ error: "Channel not found." });
      }
      id = search.data.items[0].id.channelId;
    }

    //get channel data
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/channels?part=statistics,snippet&id=${id}&key=${apiKey}`
    );
    var channelData;

    //error check again just in case we don't find anything or if the channel id is incorrect
    if (response.data.pageInfo.totalResults == 0) {
      // Channel not found
      return res
        .status(404)
        .json({
          error: "Channel not found. Did you write the channel id correctly?",
        });
    } else {
      channelData = response.data.items[0];
    }

    const channelStats = channelData.statistics;
    const channelSnippet = channelData.snippet;

    // Retrieve the channel branding settings for the banner
    const bannerUrl = `https://www.googleapis.com/youtube/v3/channels?part=brandingSettings&id=${id}&key=${apiKey}`;
    const bannerResponse = await axios.get(bannerUrl);
    const channelBanner =
      bannerResponse.data.items[0].brandingSettings.image.bannerExternalUrl;

    //make the json to send to the webpage
    res.json({
      totalSubscribers: channelStats.subscriberCount,
      viewCount: channelStats.viewCount,
      videoCount: channelStats.videoCount,
      title: channelSnippet.title,
      description: channelSnippet.description,
      thumbnail: channelSnippet.thumbnails.high.url,
      banner: channelBanner,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
