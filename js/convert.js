class Convert {
  constructor(data) {
    this.data = editor.getData();
  }

  remove(tag) {

    if (tag) {
      this.data = this.data.replace(`<${tag}>`,"")
                            .replace(`</${tag}>`,"")
    }
  }

  convert(tag) {

    let firstBracket = new RegExp(`<${tag}>`,"g");
    let endBracket = new RegExp(`</${tag}>`,"g");

    if (tag && tag != "strong") {
      this.data = this.data.replace(firstBracket,`[${tag}]`)
                            .replace(endBracket,`[/${tag}]`)
    }else if (tag == "strong") {
      this.data = this.data.replace(firstBracket,`[b]`)
                            .replace(endBracket,`[/b]`)
    }

  }

  convertColor () {

      let thereIs = this.data.match(/hsl/g);

      if (thereIs) {

      let toDo = thereIs.length;

      for (var i = 0; i < toDo; i++) {


      //to be replaced
      let toBeRemove = this.data.split("<span")[1].split(">")[0]

      //getting the value
      let rawValue = this.data.split("hsl(")[1].split(")")[0].replace(/%/g,"");

      //setting values
      let h = Number( rawValue.split(",")[0] );
      let s = Number( rawValue.split(",")[1] );
      let l = Number( rawValue.split(",")[2] );

      //final vaue
      let value = hslToHex(h, s, l).replace("#","");

      //removing
      this.data = this.data.replace(toBeRemove, `[${value}]`)
                           .replace("<span", "")
                           .replace(">", "")
                           .replace("</span>", "");


      }
    }
  }

  log () {
    console.log(this.data)
  }

  getCode() {
    return this.data;
  }

}

function hslToHex(h, s, l) {
  h /= 360;
  s /= 100;
  l /= 100;
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p, q, t) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = x => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
