$( function() {
    $( "#gnb_tabs" ).tabs({
      event: "mouseover"
    });
    
    $('.tabgroup > .tab_list').hide();
    $('.tabgroup > #tab2').show();
    $('.tabs a').click(function(e){
      e.preventDefault();
        var $this = $(this),
            tabgroup = '#'+$this.parents('.tabs').data('tabgroup'),
            others = $this.closest('li').siblings().children('a'),
            target = $this.attr('href');
        others.removeClass('active');
        $this.addClass('active');
        $(tabgroup).children('.tab_list').hide();
        $(target).show();
    })
}
);
onload=function(){
};
var m3=[
    {m:"01월",v:300000}
    ,{m:"02월",v:0}
    ,{m:"03월",v:200000}
    ,{m:"04월",v:400000}
    ,{m:"05월",v:100000}
    ,{m:"06월",v:300000}
],chart3=AmCharts.makeChart("lchart", {
    type:'serial',
    startDuration:1,
    color:'#888',
    colors:['#F79185'],
    dataProvider:m3,
    dataDateFormat:'MM',
    categoryField:'m',
    graphs:[
        {valueField:'v',labelText:'[[value]]',bullet:'round',bulletBorderAlpha:1,bulletColor:'#FFF',bulletSize:10,useLineColorForBulletBorder:true,balloonText:"[[category]]월 : [[value]]"}
    ],
    chartCursor:{categoryBalloonDateFormat:'MM',cursorColor:'#F79185'},
    valueAxes:[{axisAlpha:0,gridAlpha:.05,labelsEnabled:false}],
    categoryAxis:{axisAlpha:0,gridAlpha:0}
}),menu=function(o,n,c){
    o.className='';
    n.className=c;
},mc=function(e,el){
    if(e.clientY<40)location='mtodo.htm';
    else if(e.clientY<100)menu(el,el.nextSibling,'on2')
};

// 도넛차트
function sliceSize(dataNum, dataTotal) {
  return (dataNum / dataTotal) * 360;
}

function addSlice(id, sliceSize, pieElement, offset, sliceID, color) {
  $(pieElement).append("<div class='slice "+ sliceID + "'><span></span></div>");
  var offset = offset - 1;
  var sizeRotation = -179 + sliceSize;

  $(id + " ." + sliceID).css({
    "transform": "rotate(" + offset + "deg) translate3d(0,0,0)"
  });

  $(id + " ." + sliceID + " span").css({
    "transform"       : "rotate(" + sizeRotation + "deg) translate3d(0,0,0)",
    "background-color": color
  });
}

function iterateSlices(id, sliceSize, pieElement, offset, dataCount, sliceCount, color) {
  var
    maxSize = 179,
    sliceID = "s" + dataCount + "-" + sliceCount;

  if( sliceSize <= maxSize ) {
    addSlice(id, sliceSize, pieElement, offset, sliceID, color);
  } else {
    addSlice(id, maxSize, pieElement, offset, sliceID, color);
    iterateSlices(id, sliceSize-maxSize, pieElement, offset+maxSize, dataCount, sliceCount+1, color);
  }
}

function createPie(id) {
  var
    listData      = [],
    listTotal     = 0,
    offset        = 0,
    i             = 0,
    pieElement    = id + " .pie-chart__pie"
    dataElement   = id + " .pie-chart__legend"

    color         = [
      "cornflowerblue",
      "olivedrab",
      "orange",
      "tomato",
      "crimson",
      "purple",
      "turquoise",
      "forestgreen",
      "navy"
    ];

  color = shuffle( color );


  for(i = 0; i < listData.length; i++) {
    listTotal += listData[i];
  }

  for(i=0; i < listData.length; i++) {
    var size = sliceSize(listData[i], listTotal);
    iterateSlices(id, size, pieElement, offset, i, 0, color[i]);
    $(dataElement + " li:nth-child(" + (i + 1) + ")").css("border-color", color[i]);
    offset += size;
  }
}

function shuffle(a) {
    var j, x, i;
    for (i = a.length; i; i--) {
        j = Math.floor(Math.random() * i);
        x = a[i - 1];
        a[i - 1] = a[j];
        a[j] = x;
    }

    return a;
}

function createPieCharts() {
  createPie('.pieID--operations' );
}

createPieCharts();
