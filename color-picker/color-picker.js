new Vue({
    el: '#cpApp',
    data: {
        typeRGB: 'RGB',
        typeHex: 'HEX',
        initialColor: {
            type: '',
            red: '',
            green: '',
            blue: '',
            hexa: '',
            opacity: 1,
            savedAt: -1
        },
        color: {
            type: '',
            red: '',
            green: '',
            blue: '',
            hexa: '',
            opacity: 1,
            savedAt: -1
        },
        colors: [
            {
                type: "RGB",
                red: 2,
                green: 0,
                blue: 255,
                opacity: "0.99",
                rgb: "rgb(2,0,255)",
                rgba: "rgba(2,0,255,0.99)",
                hexa: "",
                clicking: false,
                savedAt: 158801756230,
            },
            {
                type: "RGB",
                red: 255,
                green: 0,
                blue: 255,
                opacity: "0.99",
                rgb: "rgb(255,0,255)",
                rgba: "rgba(255,0,255,0.99)",
                hexa: "#FF00FFFC",
                clicking: false,
                savedAt: 15880175623,
            },
            {
                type: "RGB",
                red: 255,
                green: 0,
                blue: 255,
                opacity: "0.99",
                rgb: "rgb(255,0,255)",
                rgba: "rgba(255,0,255,0.99)",
                hexa: "#FF00FFFC",
                clicking: false,
                savedAt: 1588017562306,
            }
        ],
        RGB_HEX: /^#?(?:([\da-f]{3})[\da-f]?|([\da-f]{6})(?:[\da-f]{2})?)$/i
    },
    computed: {
        colorTypeIsRGB() {
            return String(this.color.type).toLowerCase() === "rgb";
        },
        colorTypeIsHex() {
            return String(this.color.type).toLowerCase() === "hex";
        },
        thereIsAtLeastOneColor() {
            return this.colors.length;
        },
        thereIsSelectedColor() {
            return this.color.savedAt !== '' && this.color.savedAt > 1;
        },
        isThereMoreThanOneColor() {
            return this.colors.length > 1;
        },
        numberOfColors() {
            return this.colors.length;
        },
        savedDate() {
            return this.colors.length;
        },
        savedTime() {
            return this.colors.length;
        },
        savedMoment() {
            return this.colors.length;
        },
        cpFormTitleValue() {
            return (this.color.savedAt < 1)?'New Color':'Edit color';
        },
        cpFormAddButtonValue() {
            return (this.color.savedAt < 1)?'Add':'Save';
        },
        isCcurrentColorValid() {
            const
                regExpHex   = /^#([\da-f]{3}){1,2}$/i,
                regExpHexA  = /^#([\da-f]{4}){1,2}$/i,
                regExpRGB   = /^rgb\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){2}|((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s)){2})((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]))|((((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){2}|((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){2})(([1-9]?\d(\.\d+)?)|100|(\.\d+))%))\)$/i,
                regExpRGBA  = /^rgba\((((((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5]),\s?)){3})|(((([1-9]?\d(\.\d+)?)|100|(\.\d+))%,\s?){3}))|(((((1?[1-9]?\d)|10\d|(2[0-4]\d)|25[0-5])\s){3})|(((([1-9]?\d(\.\d+)?)|100|(\.\d+))%\s){3}))\/\s)((0?\.\d+)|[01]|(([1-9]?\d(\.\d+)?)|100|(\.\d+))%)\)$/i;

            if (this.colorTypeIsRGB){
                const
                    rgbaValue = `rgba(${this.color.red},${this.color.green},${this.color.blue},${this.color.opacity})`,
                    isRGB = regExpRGB.test(`rgb(${this.color.red},${this.color.green},${this.color.blue}`),
                    isRGBA = regExpRGBA.test(rgbaValue);
                if (isRGBA) {
                    // this.color.rgba = rgbaValue;
                    this.color.hexa = String(this.rgba2hexa(this.color.rgba)).toUpperCase();
                }
                return isRGBA;
            }
            else if (this.colorTypeIsHex){
                const
                    hexaValue = String(this.color.hexa).indexOf('#')>-1 ? this.color.hexa : '#'+this.color.hexa,
                    isHex   = regExpHex.test(String(this.color.hexa).indexOf('#')>-1 ? this.color.hexa : '#'+this.color.hexa),
                    isHexA = regExpHexA.test(hexaValue);
                if (isHexA) {
                    const rgbaValue = this.hexa2rgba(this.color.hexa);
                    this.color.rgba = `rgba(${rgbaValue.rgba.join()})`;
                    this.color.red = rgbaValue.rgba[0];
                    this.color.green = rgbaValue.rgba[1];
                    this.color.blue = rgbaValue.rgba[2];
                    this.color.opacity = rgbaValue.rgba[3];
                    // this.color.hexa = String(this.rgba2hexa(this.color.rgba)).toUpperCase();
                }
                return isHexA;
            }
            return String(this.color.type).toLowerCase().includes('rgb','rgba','hex','hexa');
        },
        getColors() {
            return this.colors.filter(_color => _color.archived !== true )
        }
    },
    watch: {

    },
    methods: {
        cpAddColor() {
            const newColor = {
                    type: this.color.type,
                    red: this.color.red,
                    green: this.color.green,
                    blue: this.color.blue,
                    opacity: this.color.opacity,
                    rgb: `rgb(${this.color.red},${this.color.green},${this.color.blue})`,
                    rgba: `rgba(${this.color.red},${this.color.green},${this.color.blue},${this.color.opacity})`,
                    hexa: String(this.color.hexa).indexOf('#')>-1 ? this.color.hexa : '#'+this.color.hexa,
                    clicking: false,
                    savedAt: this.color.savedAt,
                };
            let edited;

            if (String(newColor.type).toLowerCase().includes('hex', 'hexa')){
                const rgbaValue = this.hexa2rgba(this.color.hexa);
                newColor.rgba = `rgba(${rgbaValue.rgba.join()})`;
                newColor.rgb = `rgb(${rgbaValue.rgba.slice(0, 3).join()})`;

                newColor.red = rgbaValue.rgba[0];
                newColor.green = rgbaValue.rgba[1];
                newColor.blue = rgbaValue.rgba[2];
                newColor.opacity = rgbaValue.rgba[3];

                newColor.type = 'RGB'
            }
            else if (String(newColor.type).toLowerCase().includes('rgb', 'rgba')) {

            }
            newColor.hexa = String(this.rgba2hexa(newColor.rgba)).toUpperCase();
            newColor.hexa = String(newColor.hexa).indexOf('#')>-1 ? newColor.hexa : '#'+newColor.hexa;

            this.colors.forEach((_color, _index, _colors) => {
                if (_color != null) {
                    if (_color.rgba === newColor.rgba || _color.hexa === newColor.hexa) {
                        this.colors.splice(_index, 1, null)
                    }
                }
            });
            this.colors = this.colors.filter(_color => _color !== null);

            this.colors.forEach((_color, _index, _colors) => {
                if (_color.savedAt === newColor.savedAt) {
                    this.colors.splice(_index, 1, newColor);
                    edited = true;
                }
            });

            if (!edited){
                newColor.savedAt = Date.now();
                // this.colors.unshift(newColor);
                this.colors.splice(0,0,newColor);
            }
            this.color = this.initialColor;

            //console.log(this.colors)
        },
        cpCancelColor() {
            this.color = Object.assign({}, this.initialColor);
        },
        cpDeleteSelectedColor() {
            this.colors.forEach((_color, _index, _colors) => {
                if (_color.rgba === this.color.rgba || _color.hexa === this.color.hexa || _color.savedAt === this.color.savedAt) {
                    this.colors.splice(_index, 1, null)
                }
            });
            this.colors = this.colors.filter(_color => _color !== null);
            this.cpCancelColor()
        },
        cpDropColors() {
            this.colors = [];
            this.color = this.initialColor
        },
        cpArchiveColor() {
            this.colors.forEach((_color, _index, _colors) => {
                if (_color.savedAt === this.color.savedAt) {
                    _color.archived = true
                    this.colors.splice(_index, 1, _color)
                }
            });
            this.cpCancelColor()
        },
        cpLoadColor(index) {
            const _color = this.colors.slice(index,index+1)[0];
            this.color = Object.assign({}, this.color, _color);
            this.onColorClicking(index);
        },
        onColorClicking(index, mousedown=false) {
            let _color = this.colors.slice(index,index+1)[0];
            // console.log(index);
            this.$set(
                this.colors,
                index,
                Object.assign(
                    {},
                    _color,
                    {clicking: mousedown})
            );
            // console.log(this.colors.slice(index,index+1)[0]);
        },
        isUndefined(value) {
            return value === '' || value !== null || value !== undefined
        },
        rgba2hexa(orig) {
            let a,
                rgb = orig.replace(/\s/g, '').match(/^rgba?\((\d+),(\d+),(\d+),?([^,\s)]+)?/i),
                alpha = (rgb && rgb[4] || "").trim(),
                hexAlpha,
                hex = rgb ?
                    (rgb[1] | 1 << 8).toString(16).slice(1) +
                    (rgb[2] | 1 << 8).toString(16).slice(1) +
                    (rgb[3] | 1 << 8).toString(16).slice(1) : orig;
            if (alpha !== "") {
                a = alpha;
            } else {
                a = 0o1;
            }

            a = Math.round(a * 100) / 100;
            alpha = Math.round(a * 255);
            hexAlpha = (alpha + 0x10000).toString(16).substr(-2).toUpperCase();
            hex = hex + hexAlpha;

            return hex;
        },
        hexa2rgba(hexa) {
            let red = 0, green = 0, blue = 0, alpha = 1, hexaCode, rgbaCode, invalidHexaCode;

            hexaCode = hexa.indexOf('#')>-1 ? hexa : '#'+hexa;

            switch (hexaCode.length-1) {
                case 3:
                case 4: {
                    red     = "0x" + hexaCode[1] + hexaCode[1];
                    green   = "0x" + hexaCode[2] + hexaCode[2];
                    blue    = "0x" + hexaCode[3] + hexaCode[3];

                    if (hexaCode.length == 5)
                        alpha = "0x" + hexaCode[4] + hexaCode[4];

                    break;
                }
                case 6:
                case 8: {
                    red     = "0x" + hexaCode[1] + hexaCode[2];
                    green   = "0x" + hexaCode[3] + hexaCode[4];
                    blue    = "0x" + hexaCode[5] + hexaCode[6];

                    if (hexaCode.length == 9)
                        alpha = "0x" + hexaCode[7] + hexaCode[8];

                    break;
                }
                default: {
                    invalidHexaCode = true;
                    break;
                }
            }

            if (invalidHexaCode) {
                rgbaCode = 'INVALID !';
                console.log('Your Hex alpha code is invalid');
            }
            else {
                rgbaCode = {
                    rgba: [+red, +green, +blue, +(alpha / 255).toFixed(2)],
                    rgbaInpercent: [+(red / 255 * 100).toFixed(1), +(green / 255 * 100).toFixed(1), +(blue / 255 * 100).toFixed(1), +(alpha * 100).toFixed(1)]
                }
            }
            // console.log(rgbaCode)
            return rgbaCode;

            //https://css-tricks.com/converting-color-spaces-in-javascript/
            // https://gist.github.com/danieliser/b4b24c9f772066bcf0a6
        },
        cpConvertForPreview() {

        }
    }
});