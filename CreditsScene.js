/**
 * Represents a scene of credits text.
 */
class CreditsScene {
  /**
   * Represents an interminable timespan for scene display.
   * @static @constant
   */
  static get INFINITY() {
    return -1;
  }
  /**
   * Instantiates a new credits scene.
   * 
   * @constructor
   * @param {string} initialText Initial text for scene display, separated by `\n` linebreaks. 
   * @param {number} hangTime Time in milliseconds to display (Default 5000ms).
   *                          `CreditsScene.INFINITY` to display indefinitely.
   * @param {number} delayToNext  Time in milliseconds to hide scene before displaying the next.
   *                              (Default 2000ms). `CreditsScene.INFINITY` to hide indefinitely.
   */
  constructor(
    initialText=null,
    hangTime=5000,
    delayToNext=2000)
  {
    /** @property {Array} TextContent - String array of the scene's content. @private */
    this.TextContent = [];

    /** @property {number} HangTime - Time to display the scene's content. */
    this.HangTime = hangTime;

    /** @property {number} DelayToNext - Time to hide the scene before displaying the next */
    this.DelayToNext = delayToNext;

    /** @property {number} Kerning - Distance between characters in pixels (default 3px) */
    this.Kerning = 3;
    /** @property {number} LineSpacing - Distance between lines in pixels (default 4px) */
    this.LineSpacing = 4;
    /** @property {number} WhiteSpace - Width in pixels of whitespace characters (default 30px) */
    this.WhiteSpace = 30;

    /** @property {number} TimeOut - Date.getTime() at which to time out to next scene */
    this.TimeOut = 0;

    if (initialText != null) {
      this.TextContent = initialText.split("\n");
    }
  }

  /**
   * Adds a line to the scene's content.
   * @param {string} line Line of text to add to credits scene.
   */
  AddLine(line) {
    this.TextContent.push(line);
  }
}