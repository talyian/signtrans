// I use the en.wiktionary.org notation for signs

var handshape_mappings = {
    // "A": "Au^",
    // "B": "Bo-",
    // "C": "B~o",
    // "D": "Dot",
    // "E": "B\"o-"
    "OpenB": "B",
    "9": "F",
    "1": "D",
    "0": "O"
}

function Sign(array) {
    this.data = array;
    this.handshape = array[1];
    if (this.handshape in handshape_mappings)
        this.handshape = handshape_mappings[this.handshape];
    this.position = array[2];
    this.orientation = array[3];
}
Sign.prototype.toString = function() { return this.data[0]; };
Sign.prototype.inspect = function() { return this.data[0]; };

function parseWikiNotation(signString) {
    return signString.split(' ').flatMap(function(sign) {
        m = /^(\w+)@(\w+)-(\w+)/.exec(sign);
        if (m) return [new Sign(m)];
        m = /^\w+$/.exec(sign);
        if (m) return [new Sign([sign, sign, "Side", "PalmForward"])];
        return [];
    })
}

function lookupWikiNotation(english) {
    //TODO TODO
    return {
        "hello": ["B@Sfhead-PalmForward", "B@FromSfhead-PalmForward"],
        "happy": ["OpenB@Chest-PalmBack-OpenB@Chest-PalmBack Upanddown-Upanddown OpenB@SideNeckhigh-PalmBack-OpenB@SideNeckhigh-PalmBack"],
        "family": ["9@RadialHand-PalmForward-9@CenterChesthigh-PalmForward",
                   "RoundHoriz-RoundHoriz",
                   "9@UlnarHand-PalmBack-9@CenterChesthigh-PalmBack"],
        "<alphabet>": "$ABCDEFGHIJKLMNO".split(''),
        "welcome_to_yelp": [
            "welcome1",
            "welcome2",
            "yelp1",
            "yelp2"
        ]
    }[english.toLowerCase()] || english.toUpperCase().split('');
}

function parseSequence(signs) {
    signs = signs.split(' ');
    console.log(signs)
    signs = signs.flatMap(lookupWikiNotation)
    console.log(signs)
    signs = signs.flatMap(parseWikiNotation)
    console.log(signs)
    return signs
}
