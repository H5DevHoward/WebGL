var week = '今天星期' + '日一二三四五六'.charAt(new Date().getDay());
console.log(week, new Date().getMonth()+1,new Date().getDate());


function main() {
    var canvas = document.getElementById('webgl');

    var gl = getWebGLContext(canvas);
    if(!gl) {
        console.log('Failed to get the rendering context foe WebGl');
        return;
    }

    gl.clearColor(0.0, 1.0, 1.0, 0.4);
    gl.clear(gl.COLOR_BUFFER_BIT);
}
