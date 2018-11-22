//header
function hcommon(){
    $('body').css('overflow','hidden');
    $('html').css('overflow','hidden');
    $('.hattach').show();
    $('.hcclose').show();
}
$('.hconl').click(function(){
    hcommon();
    $('.hmenul').show();
})
$('.hcsearch').click(function(){
    hcommon();
    $('.hsearch').show();
})
$('.hclanguage').click(function(){
    hcommon();
    $('.hlanguage').show();
})
$('.hcmenur').click(function(){
    hcommon();
    $('.hmenur').show();
})
$('.hcclose').click(function(){
    $('body').css('overflow','auto');
    $('html').css('overflow','auto');
    $('.hcclose').hide();
    $('.hattach').hide();
    $('.hmenul').hide();
    $('.hmenur').hide();
    $('.hsearch').hide();
    $('.hlanguage').hide();
    $('.hmlwrap').removeAttr('style');
    $('.hmlclose').hide()
    $('.hmlopen').show()
    $('.hattachac').removeClass('hattachac');
})
$('.hmlitem1').click(function(e){
    if($(this).siblings('.hmlwrap').css('display')=='none'){
        e.preventDefault();
        $(this).parents('li').siblings('li').find('.hmlopen').show();
        $(this).parents('li').siblings('li').find('.hmlclose').hide();

        $(this).parents('li').siblings('li').find('.hattachac').parents('.hmlitem1').siblings('.hmlwrap').hide();
        $(this).parents('li').siblings('li').find('.hattachac').removeClass('hattachac');


        $(this).find('p').addClass('hattachac');
        $(this).find('.hmlclose').show();
        $(this).find('.hmlopen').hide();
    }
    $(this).siblings('.hmlwrap').show();
})
$('.hmlclose').click(function(e){
    if ( e && e.stopPropagation ){
        e.stopPropagation(); 
    }else{
        window.event.cancelBubble = true; 
    }
    console.log()
    $(this).parents('.hmlitem1').find('p').removeClass('hattachac');
    $(this).parents('.hmlitem1').siblings('.hmlwrap').hide();
    console.log('hmlcolse');
    $(this).siblings('img').show();
    $(this).hide();
});
$('.hmlopen').click(function(e){
    if ( e && e.stopPropagation ){
        e.stopPropagation(); 
    }else{
        window.event.cancelBubble = true; 
    }
    console.log('hmlopen');
    $(this).parents('li').siblings('li').find('.hmlopen').show();
    $(this).parents('li').siblings('li').find('.hmlclose').hide();

    $(this).parents('li').siblings('li').find('.hattachac').parents('.hmlitem1').siblings('.hmlwrap').hide();
    $(this).parents('li').siblings('li').find('.hattachac').removeClass('hattachac');


    $(this).hide();
    $(this).siblings('img').show();
    $(this).parent('.hmlitem1').find('p').addClass('hattachac');
    $(this).parent('.hmlitem1').siblings('.hmlwrap').show();
})


//底部
//分享
$('.shareicon').click(function(){
    $(".sharedetail").toggle()
})
//微信显示
$('.showwx').click(function(){
    $('.attach').show();
    $(".weixin").show();
    $('body').css('overflow','hidden');
    $('html').css('overflow','hidden');
})
//关闭包含轮播视频关闭
$('.attachclose').click(function(e){
    $('body').css('overflow','auto');
    $('html').css('overflow','auto');
    $(".attach").hide();
    $(".weixin").hide();
    $(".weixin1").hide();
    $(".video").hide();
    e.stopPropagation();
})
//视频
$('.videoshow').click(function(){
   var dataurl=$(this).attr('data-url');
   var datatit=$(this).attr('data-tit');
  $('.attach').show();
  $('.video').show();
  $('video').attr('src',dataurl);
  $('.videotit').html(datatit);
  $('canvas').css('height',$('video').height())
  $('video')[0].play();
  $('body').css('overflow','hidden');
  $('html').css('overflow','hidden');
})


//中英文切换
  function changeLanguage(obj) {
        var host = window.location.host;
        var pathname = window.location.pathname;
        var protocol = window.location.protocol;
        var str = host;
        spstr = str.split("");
        var lastStr = spstr[spstr.length - 1];
        if (lastStr != "/") {
            obj = "/" + obj;
        } else {
            obj = obj;
        }
        if (pathname == "/") {
            pathname = "";
        } else {
            pathname = pathname.replace("/zh-cn", "");
            pathname = pathname.replace("/en", "");
        }
        var href = protocol + "//" + host + obj + pathname;


        window.location.href = href;
    }
	
	
//页面加载js赋值
 $(function () {
        if ($(".hei .hclanguage").text() == "中文") {
            $("#topSearch").attr('placeholder', '搜索');
        } else {
            $("#topSearch").attr('placeholder', 'Search');
        }

    })








//footer


