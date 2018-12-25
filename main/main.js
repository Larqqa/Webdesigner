const toggleVisible = function() {
  let e = $('.colorTesting');
  let classes = e[0].classList;

  classes.forEach(
    function(el){
      if (el === 'hide') e.removeClass('hide')
      else e.addClass('hide');
    }
  );
};
