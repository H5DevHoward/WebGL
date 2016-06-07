var week = '今天星期' + '日一二三四五六'.charAt(new Date().getDay());
console.log(week, new Date().getMonth()+1,new Date().getDate());


// 顶点着色器程序
var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    'attribute float a_PointSize;\n' +
    'void main() {\n' +
    ' gl_Position = a_Position;\n' + // 设置坐标
    ' gl_PointSize = a_PointSize;\n' + // 设置尺寸
    '}\n';

// 片元着色器程序
var FSHADER_SOURCE =
    'precision mediump float;\n' +
    'uniform vec4 u_FragColor;\n' + // uniform变量
    'void main() {\n' +
    ' gl_FragColor = u_FragColor;\n' + // 设置颜色
    '}\n';

function main() {
    var canvas = document.getElementById('webgl');

    var gl = getWebGLContext(canvas);
    if(!gl) {
        console.log('Failed to get the rendering context foe WebGl');
        return;
    }

    // 初始化着色器
    if(!initShaders(gl, VSHADER_SOURCE, FSHADER_SOURCE)) {
        console.log('Failed to initialize shaders.');
        return;
    }

    // 获取attribute变量的存储位置
    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    var a_PointSize = gl.getAttribLocation(gl.program, 'a_PointSize');

    if(a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return;
    }

    // 获取u_FragColor变量的存储位置
    var u_FragColor = gl.getUniformLocation(gl.program, 'u_FragColor');

    if(!u_FragColor) {
        console.log('Failed to get u_FragColor variable');
        return;
    }

    // 将顶点位置传输给attribute变量
    gl.vertexAttrib1f(a_PointSize, 5.0);
    //
    // var position = new Float32Array([0.0, 0.5, 0.0, 1.0]);
    // gl.vertexAttrib4fv(a_Position, position);

    canvas.onmousedown = function(ev) {
        click(ev, gl, canvas, a_Position, u_FragColor);
    };


    gl.clearColor(0.0, 1.0, 1.0, 0.4);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // 绘制一个点
    // gl.drawArrays(gl.POINTS, 0, 1);
}

var g_points = []; // 鼠标点击位置数组
var g_colors = []; // 存储点颜色的数组

function click(ev, gl, canvas, a_Position, u_FragColor) {
    var x = ev.clientX;
    var y = ev.clientY;
    var rect = ev.target.getBoundingClientRect();

    x = ((x-rect.left) - canvas.width/2)/(canvas.width/2);
    y = (canvas.height/2 - (y-rect.top))/(canvas.height/2);

    // 将坐标存储到 g_points 数组中
    // g_points.push(x);
    // g_points.push(y);
    g_points.push([x, y]);

    // 将点的颜色存储到g_colors数组中
    if(x >= 0.0 && y >= 0.0) { // 第一象限
        g_colors.push([1.0, 0.0, 0.0, 1.0]);
    }else if(x < 0.0 && y< 0.0) { // 第三象限
        g_colors.push([0.0, 1.0, 0.0, 1.0]);
    }else {
        g_colors.push([1.0, 1.0, 1.0, 1.0]);
    }

    // 清除 <canvas>
    gl.clear(gl.COLOR_BUFFER_BIT);

    var len = g_points.length;
    for(var i=0;i<len;++i) {
        var xy = g_points[i];
        var rgba = g_colors[i];

        // 将点的位置传递到变量中 a_Position
        gl.vertexAttrib2f(a_Position, xy[0], xy[1]);

        // 将点的颜色传输到 u_FragColor 变量中
        gl.uniform4f(u_FragColor, rgba[0], rgba[1], rgba[2], rgba[3]);

        // 绘制点
        gl.drawArrays(gl.POINTS, 0, 1);
    }
}
