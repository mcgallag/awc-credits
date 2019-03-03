/// <reference path="pixi/pixi.js" />

/**
 * Handles generation and layout of character sprites for rendering via PIXI.js
 */
class TextRenderer {
  /**
   * Represents whitespace in place of a Sprite object
   * @property @static
   */
  static get WHITESPACE() {
    return -1;
  }

  /**
   * Returns true if `glyph` is in the font.
   * @param {string} glyph character to test.
   */
  IsValidChar(glyph) {
    return /^[ A-Za-z\.]$/.test(glyph);
  }

  /**
   * Returns true if `glyph` is an uppercase character.
   * @param {string} glyph character to test.
   */
  IsUpper(glyph) {
    return /^[A-Z]$/.test(glyph);
  }

  /**
   * Returns true if `glyph` is a lowercase character.
   * @param {string} glyph character to test.
   */
  IsLower(glyph) {
    return /^[a-z]$/.test(glyph);
  }

  /**
   * Returns true if `glyph` is valid whitespace.
   * @param {string} glyph character to test.
   */
  IsSpace(glyph) {
    return (glyph == ' ');
  }

  /**
   * Returns true if `glyph` is valid punctuation.
   * @param {string} glyph character to test.
   */
  IsPunctuation(glyph) {
    return (glyph == '.');
  }

  /**
   * Generates the sprite filename for a given character.
   * @param {string} glyph character for which to retrieve sprite
   * @returns Filename for the given glyph. Returns `null` if an invalid character is given.
   */
  GetGlyphFilename(glyph) {
    if (this.IsValidChar(glyph) == false) return TextRenderer.WHITESPACE;
    if (this.IsUpper(glyph)) return glyph + "_upper.png";
    if (this.IsLower(glyph)) return glyph + "_lower.png";
    if (this.IsPunctuation(glyph)) return "Period.png";

    return TextRenderer.WHITESPACE;
  }

  /**
   * Generates a new Sprite for a given character.
   * @param {string} glyph character for sprite creation
   * @returns New `PIXI.Sprite` for the character. Returns `null` if an invalid character is given.
   */
  GetSprite(glyph) {
    let filename = this.GetGlyphFilename(glyph);
    if (filename == TextRenderer.WHITESPACE) return TextRenderer.WHITESPACE;
    let newSprite = new Sprite(this.FontTextures[filename]);
    newSprite.tag = glyph;
    return newSprite;
  }

  /**
   * Generates an array of sprites for a line of text
   * @param {string} line string from which to generate sprites
   * @returns {Array}
   */
  GetSpritesForLine(line) {
    let sprites = [];
    for (let i = 0; i < line.length; i++) {
      sprites.push(this.GetSprite(line[i]));
    }
    return sprites;
  }

  /**
   * Returns the typographic cap height of the loaded font, using
   * upper case `I` as reference.
   * 
   * @property
   * @returns {number}
   */
  get CapHeight() {
    return this.FontTextures["I_upper.png"].orig.height;
  }

  /**
   * Calculates the total width of an array of sprites
   * @param {Array} sprites array of sprites to sum
   * @param {number} kerning pixel distance between sprites, default is 3px
   * @param {number} whitespace pixel distance for whitespace character
   */
  LinePixelWidth(sprites, kerning=3, whitespace=30) {
    let totalWidth = 0;

    // iterate through each character sprite
    for (const sprite of sprites) {
      // whitespace will not have a sprite
      if (sprite != TextRenderer.WHITESPACE) {
        totalWidth += sprite.width;
        totalWidth += kerning;
      } else {
        totalWidth += whitespace;
      }
    }

    // remove that last bit of kerning and return
    return totalWidth - kerning;
  }

  /**
   * Instantiates a new TextRenderer
   * @param {object} font textures of font, from PIXI
   * @constructor
   */
  constructor(font) {
    /** @property {object} FontTextures object of textures for loaded font. */
    this.FontTextures = font;
  }

  /**
   * Renders a scene of credits text onto a container.
   * @param {CreditsScene} scene Scene of credits to render
   * @param {PIXI.Container} stage PIXI.Container in which to render the scene
   */
  RenderScene(scene, stage) {
    // calculate y value for first line of text, offset from center of viewport
    let y = app.view.height / 2 - (0.5 * scene.TextContent.length * (this.CapHeight + scene.LineSpacing));
    // adjust for center line spacing
    y += scene.LineSpacing / 2;
    
    for (let i = 0; i < scene.TextContent.length; i++) {
      let line = scene.TextContent[i];

      // only generate sprites if there is text on the line
      if (line != "") {
        // create the sprites for the text
        let lineSprites = this.GetSpritesForLine(line);

        // calculate offset from center to center-align the text
        let x = app.view.width / 2;
        let totalWidth = this.LinePixelWidth(lineSprites, scene.Kerning);
        x -= totalWidth / 2;

        // position each character sprite
        for (let sprite of lineSprites) {
          // whitespace will not generate a sprite
          if (sprite != TextRenderer.WHITESPACE) {
            sprite.y = y;
            sprite.x = x;

            // add the sprite to the stage
            stage.addChild(sprite);

            // increment the x position for the next character
            x += sprite.width;
            x += scene.Kerning;
          } else if (sprite == TextRenderer.WHITESPACE) {
            // increment the x position by whitespace offset
            x += scene.WhiteSpace;
          }
        }
      }

      // increment y value for next line of text
      y += (this.CapHeight + scene.LineSpacing);
    }
  }
}