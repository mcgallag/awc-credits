# All Wings Considered Credits Generator
*Created by Michael Gallagher (mcgallag@gmail.com)*

## Purpose
To facilitate easy customization of a credits sequence rendered in a bitmap font overlaid on top of a looping video sequence. Intended for use in video production of stylized credits for YouTube "All Wings Considered" series.

Written in JavaScript using the [PixiJS](http://www.pixijs.com) library.

## Setup
*Caveat lector: Note that this program seems to work as a local file when I tested it, but results may very wildly depending on your system and browser configuration. If you are not getting proper results from a local file OBS browser source, you will have to put it on a web server.*

In order to get a secure browser environment, the credits generator may need to be delivered to OBS from an HTTP server.

There are two options to do this:
1. I have included a copy of [Mongoose](https://www.cesanta.com), a lightweight web server licensed for non-commercial usage and distribution under terms of GPL v2. Simply run the included executable and use http://localhost:8080/ as your source URL in OBS.
2. Upload the contents of the zip file to a web server and use the server's URL as your browser source URL in OBS. This might introduce a degree of latency from loading the Asteroids.mp4 (5.2 megabytes) video file, depending on your internet connection.

Once the files are on a server, they can be added as an OBS browser source:

1. Add a new Browser source to your scene. Give it a name like "Credits"
2. URL should be either the URL to your local Mongoose server or whatever server you uploaded the files to.
You can attempt it as a local file, but proper results are not guaranteed in this configuration.
4. Width should be the same as the width of your broadcast video (Likely 1280 or 1920)
5. Height should be the same as the height of your broadcast video (Likely 720 or 1080)
6. FPS should be the same as your broadcast framerate (Likely 30 or 60)
7. Make sure that "Refresh browser when scene becomes active" is checked

At this point you can either run the scene on the fly during broadcast or record it to a video file for future use.

I highly recommend playing some [thematically appropriate music](https://www.youtube.com/watch?v=L0hIwoAbCbI) while displaying it.

## Customization
The actual text for the credits is customized by editing the "Content.js" file in a text editor. It is a JavaScript object containing an array titled "pages" and can hold as many pages as you desire.

**A basic example of a 3-page credits sequence:**

    creditsData = {
      "pages": [
        {
          "hangtime": 5000,
          "delay": 2000,
          "lines": [
            "All Wings Considered",
          ]
        },
        {
          "hangtime": 5000,
          "delay": 2000,
          "lines": [
            "A",
            "Combat Information Center",
            "Production",
          ]
        },
        {
          "hangtime": 5000,
          "delay": Infinity,
          "lines": [
            "www.wcnews.com",
          ]
        },
      ]
    }

Each page can contain the following options:

 - `lines` : a comma-separate list of strings, enclosed in quotation marks. An empty line `""` will render a blank line in the credits sequence.
 - `hangtime` : time (in milliseconds) of how long to display the rendered text. (Default is 5000)
 - `delay` : time (in milliseconds) of how long to pause before displaying the *next* page. (Default is 2000)
Note that `Infinity` is a valid time for either the hangtime or delay values. These are helpful to display an ending page indefinitely or to halt the credits roll after disappearing the last page.
 - `linespacing` : amount of blank pixels between each line of rendered text. (Default is 4)
 - `kerning` : amount of blank pixels between each character of text. (Default is 3)
The linespace and kerning values are for a single page and will not affect the others.

Of all these options, the only one that is required is `lines` and the others can be omitted. Omission will result in the default values being used.

**A More Complex Example that uses all available options:**

    {
      "hangtime": Infinity,
      "delay": 0,
      "linespacing": 8,
      "kerning": 5,
      "lines": [
        "Please visit us at",
        "",
        "www.wcnews.com"
      ]
    },

## Troubleshooting
If absolutely no text is being displayed, it is very likely you forgot a comma somewhere when you were customizing the "Content.js" file. This code is parsed by the interpreter. It is actually quite forgiving, but forgetting a comma after a page's closing curly brace will grind it to a halt. Refer to the example content.js included and make a backup or re-download the template if needed! Try forcing OBS to update the page's cache (in the source options) if it is still non-responsive.

I cannot guarantee further support, but feel free to reach out to me via social media or [on Github](https://github.com/mcgallag/) and I may be able to help.

## Known Issues
The original Wing Commander credit sequence does not account for descenders in the credits text as shown in the 'y' character in this screen capture:

![Example of lower case y character being obstructed](https://mcgallag.github.io/wc-font-descenders.png)

Rather than trying to adjust line spacing dynamically, I left it up to the user to decide how to handle it. It can be left as is or the `linespacing` property for a page can be increased from the default to make it look a little better.
