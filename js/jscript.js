$(document).ready(function() {
    var newGrid = 16;
    MakeGrid(newGrid);
    Navbar();
    Resizer();
});

function Resizer() {
    interact('.gridsquare').draggable({
        // enable inertial throwing
        inertia: true,
        // keep the element within the area of it's parent
        restrict: {
            restriction: ".wrapper",
            endOnly: true,
            elementRect: {
                top: 1,
                left: 1,
                bottom: 1,
                right: 1
            }
        },
        // call this function on every dragmove event
        onmove: dragMoveListener,
    }).resizable({
        edges: {
            left: false,
            right: true,
            bottom: true,
            top: false
        }
    }).on('resizemove', function(event) {
        var target = event.target,
            x = (parseFloat(target.getAttribute('data-x')) || 0),
            y = (parseFloat(target.getAttribute('data-y')) || 0);
        // update the element's style
        target.style.width = event.rect.width + 'px';
        target.style.height = event.rect.height + 'px';
        // animate
        target.style.webkitTransform = target.style.transform =
            'translate(' + x + 'px,' + y + 'px)';
    });
}

function MakeGrid(size) {
    for (var i = 0; i < size; i++) {
        var row = document.createElement("div");
        row.className = "row";
        for (var x = 1; x <= size; x++) {
            var cell = document.createElement("div");
            cell.className = "gridsquare";
            row.appendChild(cell);
        }
        $("div#wrapper").append(row);
    }
    $(".gridsquare").mouseenter(function() {
        $(this).css("background", "black");
    });
};

function Navbar(){
	$(".clear").click(function() {
        $(".gridsquare").css("background", "white").css(
            'opacity', '1').css('height', '10px').css(
            'width', '10px').css('transform', '');
    });
    $(".new").click(function() {
        var newGrid = prompt("Enter new grid size:", 16);
        //$(".gridsquare").remove();
        $(".row").remove();
        MakeGrid(newGrid);
    });
    $(".opacity").click(function() {
        $(".gridsquare").unbind();
        $(".gridsquare").mouseenter(function() {
            reduceOpacity($(this));
        })
    });
    $(".random").click(function() {
        $(".gridsquare").unbind();
        $(".gridsquare").mouseenter(function() {
            $(this).css("background", randomColor());
        });
    });
    $(".normal").click(function() {
        $(".gridsquare").unbind();
        $(".gridsquare").mouseenter(function() {
            $(this).css("background", "black");
        });
    });
}

function dragMoveListener(event) {
    var target = event.target,
        // keep the dragged position in the data-x/data-y attributes
        x = (parseFloat(target.getAttribute('data-x')) || 0) + event.dx,
        y = (parseFloat(target.getAttribute('data-y')) || 0) + event.dy;
    // translate the element
    target.style.webkitTransform = target.style.transform = 'translate(' +
        x + 'px, ' + y + 'px)';
    // update the posiion attributes
    target.setAttribute('data-x', x);
    target.setAttribute('data-y', y);
}

function randomColor() {
    var red = Math.floor(Math.random() * 256)
    var blue = Math.floor(Math.random() * 256)
    var green = Math.floor(Math.random() * 256)
    return "#" + red.toHex() + blue.toHex() + green.toHex();
}
Number.prototype.toHex = function() {
    if (this < 16) {
        return '0' + this.toString(16);
    }
    return this.toString(16);
}

function reduceOpacity(elem) {
    var opacity = elem.css('opacity');
    var nextOpacity = opacity - 0.2
    if (nextOpacity > 0) {
        elem.css('opacity', nextOpacity);
    } else {
        elem.css('opacity', '0');
    }
}