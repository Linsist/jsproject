/**
 * Created by Linsist on 11/26.
 */

var ImageSwitch = {
    /**
     *
     * @param{Array} img
     */
    setSwitch : function(img){
        var current = img[0];
        for(var i=0;i<img.length;i++){
            if(current ==img[i]){
                current = img[i];

            }
        }
    }

};


