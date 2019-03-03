/**
 * Holds data for each page of credits
 * 
 * Properties:
 * 
 *       lines: a comma-separated list of text enclosed in quotation marks
 *              a empty line "" can be used for a blank line in the display
 * 
 *    hangtime: how long to display this page (in milliseconds, 5000 is the default)
 *              Infinity can be substituted to make the text display indefinitely
 *       delay: how long to wait before displaying the next page (in milliseconds, 2000 is the default)
 *              Infinity can be substituted to make the text disappear and then stop the credits roll
 * 
 *              N.B. - if the last page does not have Infinity for delay,
 *                     the credits will loop and restart with the first page
 * 
 * linespacing: amount of blank pixels between each line of text (4 is the default)
 *     kerning: amount of blank pixels between each character of text (3 is the default)
 * 
 * The only one required is "lines" and all others can be omitted (default values will be used)

   Basic example:
 
    {
      "hangtime": 5000,
      "delay": 2000,
      "lines": [
        "Hosts",
        "Ben LOAF Lesnick",
        "Jason DUNDRADAL McHale",
      ]
    },

   Advanced example:
 
    {
      "hangtime": 5000,
      "delay": Infinity,
      "linespacing": 20,
      "kerning": 8,
      "lines": [
        "Hosts",
        "",
        "Ben LOAF Lesnick",
        "Jason DUNDRADAL McHale",
      ]
    },

     ^
     |--------------- DON'T FORGET THE COMMAS ;-)

 * TROUBLESHOOTING:
 * If something isn't working, the most likely problem is you forgot the comma
 * at the end of a page.
 */

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
      "delay": 2000,
      "lines": [
        "www.wcnews.com",
      ]
    },
    {
      "hangtime": 5000,
      "delay": 2000,
      "lines": [
        "Hosts",
        "Ben LOAF Lesnick",
        "Jason DUNDRADAL McHale",
      ]
    },
    {
      "hangtime": 5000,
      "delay": 2000,
      "lines": [
        "Producer",
        "Mike TRELANE Gallagher",
      ]
    },
    {
      "hangtime": 5000,
      "delay": 2000,
      "lines": [
        "Graphics",
        "by",
        "THE DAMN SHAMES",
        "HISSTHEMOVIE",
        "",
        "Music",
        "by",
        "UTHO RILEY",
      ]
    },
    {
      "hangtime": 5000,
      "delay": 2000,
      "lines": [
        "Line Producer",
        "Alexis PATTERNED Lesnick",
      ]
    },
    {
      "hangtime": 5000,
      "delay": 2000,
      "lines": [
        "Wing Commander",
        "created by",
        "Origin Systems",
      ]
    },
    {
      "hangtime": 5000,
      "delay": 2000,
      "lines": [
        "Long Live the Confederation",
      ]
    },
    {
      "hangtime": 5000,
      "delay": 2000,
      "lines": [
        "My God",
        "Its Full of Stars",
      ]
    },
    {
      "hangtime": 5000,
      "delay": Infinity,
      "lines": [
        "Happy Wing Commanding",
      ]
    },
  ]
}