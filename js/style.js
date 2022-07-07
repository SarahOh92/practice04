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