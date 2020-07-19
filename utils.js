//interpolation function
function lerp(current, target, fraction){

    var array_of_points = [];

    for (var is = 0; is < (1/fraction); is++){
      var j = is*fraction;
      array_of_points.push(current*(1-j)+target*j);
    }
  return (array_of_points);
  }


  function lerp2(current, target, fraction){
  	return (current + fraction *(target-current));
  }


  function bezier1(p0, p1, p2, fraction){

    var q_0 = [];

    for (var is = 0; is < (1/fraction); is++){
      var j = is*fraction;
      //l_0.push(p0*(1-j)+p1*j); //L0(t)
      //l_1.push(p1*(1-j)+p2*j); //L1(t)
      q_0.push( (((1-j)**2)*p0) + (2*(1-j)*j*p1) + ((j**2) *p2))

      //c_0.push( p0*(1-j)**3 + 3*((1-j)**2)*j*p1 + 3*(1-j)*(j**2)*p2 + (j**3)*p3 )
    }
    return (q_0);

  }

  function bezier2(p0, p1, p2, p3, fraction){

    var c_0 = [];

    for (var is = 0; is < (1/fraction); is++){
      var j = is*fraction;
      //l_0.push(p0*(1-j)+p1*j); //L0(t)
      //l_1.push(p1*(1-j)+p2*j); //L1(t)
      //q_0.push( (((1-j)**2)*p0) + (2*(1-j)*j*p1) + ((j**2) *p2))

      c_0.push( p0*(1-j)**3 + 3*((1-j)**2)*j*p1 + 3*(1-j)*(j**2)*p2 + (j**3)*p3 )
    }
    return (c_0);

  }


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
