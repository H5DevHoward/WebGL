var week = '今天星期' + '日一二三四五六'.charAt(new Date().getDay());
console.log(week, new Date().getMonth()+1,new Date().getDate());


// 顶点着色器程序
var VSHADER_SOURCE =
    'attribute vec4 a_Position;\n' +
    // 'attribute float a_PointSize;\n' +
    'void main() {\n' +
    ' gl_Position = a_Position;\n' + // 设置坐标
    ' gl_PointSize = 10.0;\n' + // 设置尺寸
    '}\n';

// 片元着色器程序
var FSHADER_SOURCE =
    'precision mediump float;\n' +
    'uniform vec4 u_FragColor;\n' + // uniform变量
    'void main() {\n' +
    ' gl_FragColor = vec4(1.0, 0.0, 0.0, 1);\n' + // 设置颜色
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

    // 设置顶点位置
    var n = initVertexBuffers(gl);
    if(n < 0) {
        console.log('Failed to set the position of the vertices');
        return;
    }

    /*
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
    gl.vertexAttrib1f(a_PointSize, 10.0);
    //
    // var position = new Float32Array([0.0, 0.5, 0.0, 1.0]);
    // gl.vertexAttrib4fv(a_Position, position);

    canvas.onmousedown = function(ev) {
        click(ev, gl, canvas, a_Position, u_FragColor);
    };
    */


    gl.clearColor(0.0, 1.0, 1.0, 0.4);
    gl.clear(gl.COLOR_BUFFER_BIT);

    // 绘制三个点
    gl.drawArrays(gl.POINTS, 0, n);
}

function initVertexBuffers(gl) {
    var vertices = new Float32Array([
        0.0, 0.5, -0.5, -0.5, 0.5, -0.5
    ]);

    var n = 3; // 点的个数

    // 创建缓冲区对象
    var vertexBuffer = gl.createBuffer();
    if(!vertexBuffer) {
        console.log('Failed to create the buffer object');
        return -1;
    }

    // 将缓冲区对象绑定到目标
    gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);

    // 向缓冲区对象中写入数据
    gl.bufferData(gl.ARRAY_BUFFER, vertices, gl.STATIC_DRAW);

    var a_Position = gl.getAttribLocation(gl.program, 'a_Position');
    if(a_Position < 0) {
        console.log('Failed to get the storage location of a_Position');
        return;
    }

    // 将缓冲区对象分配给 a_Position 变量
    gl.vertexAttribPointer(a_Position, 2, gl.FLOAT, false, 0, 0);

    // 链接 a_Position 变量与分配给他的缓冲区对象
    gl.enableVertexAttribArray(a_Position);

    return n;
}
