//interpolation function, used for the rotation of the eagle
function lerp(current, target, fraction){

    var array_of_points = [];

    for (var is = 0; is < (1/fraction); is++){
      var j = is*fraction;
      array_of_points.push(current*(1-j)+target*j);
    }
  return (array_of_points);
  }

//interpolation function, used to make the veihcles turn
  function lerp2(current, target, fraction){
  	return (current + fraction *(target-current));
  }

// quadric bezier curve function
  function bezier1(p0, p1, p2, fraction){

    var q_0 = [];

    for (var is = 0; is < (1/fraction); is++){
      var j = is*fraction;

      q_0.push( (((1-j)**2)*p0) + (2*(1-j)*j*p1) + ((j**2) *p2))

    }
    return (q_0);

  }

// cubic bezier curve function
  function bezier2(p0, p1, p2, p3, fraction){

    var c_0 = [];

    for (var is = 0; is < (1/fraction); is++){
      var j = is*fraction;
      c_0.push( p0*(1-j)**3 + 3*((1-j)**2)*j*p1 + 3*(1-j)*(j**2)*p2 + (j**3)*p3 )
    }
    return (c_0);

  }

// function to plot the scenegraph of an object
  function dumpObject(obj, lines = [], isLast = true, prefix = '') {
    const localPrefix = isLast ? '└─' : '├─';
    lines.push(`${prefix}${prefix ? localPrefix : ''}${obj.name || '*no-name*'} [${obj.type}]`);
    const newPrefix = prefix + (isLast ? '  ' : '│ ');
    const lastNdx = obj.children.length - 1;
    obj.children.forEach((child, ndx) => {
      const isLast = ndx === lastNdx;
      dumpObject(child, lines, isLast, newPrefix);
    });
    return lines;
  }
