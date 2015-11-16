function Control() {

}

function init(mesh, mixer) {
    var geometry = mesh.geometry
    this.mixer = mixer;
    this.mesh = mesh;
    this.handshapes = geometry.animations.find(x => x.name == "Handshapes");

    // for(var i=0; i<geometry.animations.length; i++) {
    //     var anim = mesh.geometry.animations[i];
    //     var action = new THREE.AnimationAction(anim);
    //     action.name = anim.name;
    //     mixer.addAction(action);
    //     console.log(action.name);
    //     action.weight = 0;
    // }

    this.onready && this.onready();
}

function play(signs) {
    log("Playing Sequence:");
    signs.map(x => log(x));

    // this.handshapes is an animationclip
    // tracks should be an array of THREE.*KeyframeTracks
    var tracks = this.handshapes.tracks.map((keyframeTrack, i) => {
        // t is a *KeyFrameTrack
        var n = keyframeTrack.clone()
        // n.keys needs to be an array of {time, value} dicts
        n.keys = signs.map((sign, t) => {
            var framemap = {
                "A": 4,
                "B": 3,
                "C": 5,
                "D": 6,
                "E": 7,
                "F": 8,
                "G": 9,
                "H": 10,
                "I": 11,
                "J": 11,
                "K": 12,
                "L": 13,
                "M": 14,
                "N": 15,
                "O": 16,
                "welcome1": 23,
                "welcome2": 24,
                "yelp1": 25,
                "yelp2": 26
            };
            var frame = framemap[sign.handshape] || 2;
            var key = keyframeTrack.keys.find(x => x.time == frame);
            if (key) key = key.value;
            else {
                if (keyframeTrack.keys.length > 2) {
                    console.error("not found: frame "+ sign.handshape + "  at " + frame);
                }
                key = keyframeTrack.keys.filter(x => x.time < frame).last().value;
            }
            return {time:t*2, value:key, constantToNext:false}
        });
        // if we're looking at a hand bone, debug print values
        if (keyframeTrack.keys.length > 2) {
            // console.log("T", JSON.stringify(keyframeTrack.keys))
            // console.log("N", JSON.stringify(n.keys, null, 4))
        }
        return n;
    });
    var new_clip = new THREE.AnimationClip("currentAnimation", -1, tracks);
    var new_anim = new THREE.AnimationAction(new_clip);
    new_clip.duration += 4;
    new_anim.duration += 4;
    this.mixer.time = 0;
    this.mixer.removeAllActions();
    this.mixer.play(new_anim);
}

Control.prototype.init = init;
Control.prototype.play = play;
Control.prototype.parse = function(word) {
    signs = parseSequence(word)
    // signs.push(new Sign("-"));
    control.play(signs)
}
var control = new Control();
