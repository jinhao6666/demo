(function(win,doc){
    var timeDate=function(option){
        var _this=this;
        // 判断是否是new timeDate 的  不是的话 帮他new一下
        // if (!(this instanceof timeDate)) return new timeDate(options);
        this.localValue={
            zd:false
        };
        this.opt = this.extend(this.localValue, option, true)
        this.datehtml='';
        //判断是否标记处当前日期
        this.datecurr=true;
        // 判断传进来的是DOM还是字符串

        this.opt.ele=this.checkStrObj(option.ele);
        this.opt.valueobj=this.checkStrObj(option.valueobj);

        this.initDom();

        //绑定展开关闭事件
        // $(this.opt.ele).on('click',function(){
        //     _this.toggledate(this);
        // })
    }
    timeDate.prototype = {
        constructor: this,
        initDom:function(){
            this.datetime = document.createElement('div');
            this.datetime.className = 'datetime';
            this.opt.ele.appendChild(this.datetime);

            //添加头
            this.adddatetit();
            //添加周
            this.addweek()
            //添加日期
            this.addtable();
        },
        extend:function(o,n,override) {
            for(var key in n){
                if (n.hasOwnProperty(key) && (!o.hasOwnProperty(key) || override)) {
                    o[key] = n[key]
                }
            }
            return o
        },
        //判断传进来的是dom还是字符串
        checkStrObj:function(item){
            var item1='';
            if ((typeof item) === "string") {
                item1= document.querySelector(item)
            }else{
                item1 = item
            }
            return item1;
        },
        formatNumber:function(n){
            n = n.toString();
            return n[1] ? n : '0' + n;
        },
        //获取时间的年月日
        getDate:function(date){
            var _this=this;
            var today=date;
            var date1={};
            //获取日期中的年份
            date1.y=today.getFullYear();
            //获取日期中的月份
            date1.m=today.getMonth();
            //获取日期中的日
            date1.d=today.getDate();
            //获取当月的第一天
            date1.firstday=new Date(date1.y,date1.m,1);
            //判断第一天是星期几
            date1.dayOfWeek=date1.firstday.getDay();
            //创建月份数组
            date1.days_per_month=new Array(31,28,31,30,31,30,31,31,30,31,30,31);
            if(date1.y%4==0) {
                date1.days_per_month= new Array(31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31);
            }
            //确定日期表格所需的行数
            date1.str_nums=Math.ceil((date1.dayOfWeek+date1.days_per_month[date1.m])/7);
            date1.yearmonth=[date1.y,date1.m+1].map(_this.formatNumber).join('-');
            return date1;
        },
        //添加表头
        adddatetit:function(){
            var _this=this;
            //获取当前日期
            var today=new Date();
            if(this.opt.date){
                today=new Date(this.opt.date);
            }
            var newDate=this.getDate(today);

            this.datetit = document.createElement('div');
            this.datetit.className = 'datetit';
            this.datetime.appendChild(this.datetit);
            //左
            this.dateticonl = document.createElement('i');
            this.dateticonl.className = 'icon-zuoyou datel';
            this.datetit.appendChild(this.dateticonl);

            //日期
            this.datetdiv = document.createElement('div');
            this.datetdiv.className = 'datetitval';
            this.datetit.appendChild(this.datetdiv);
            this.datetdiv.innerText = newDate.yearmonth;

            //右
            this.dateticonr = document.createElement('i');
            this.dateticonr.className = 'icon-right dater';
            this.datetit.appendChild(this.dateticonr);

            var time1=[newDate.y,newDate.m+1,newDate.d].map(_this.formatNumber).join('-');
            $(this.valueobj).html(time1)

            var _this = this
            _this.dateticonl.onclick=function(e){
                e.stopPropagation();
                _this.prevmonth()
            },
            _this.dateticonr.onclick=function(e){
                e.stopPropagation();
                _this.nextmonth()
            }
        },
        //添加table
        addtable:function(){
            var _this=this;
            //获取当前日期
            var today=new Date();
            if(this.opt.date){
                today=new Date(this.opt.date);
            }

            var newDate=this.getDate(today);

            this.datecon = document.createElement('div');
            this.datecon.className = 'datecon';
            this.datetime.appendChild(this.datecon);
            //二维数组
            for(i=0;i<newDate.str_nums;i+=1){
                this.datecdiv = document.createElement('div');
                this.datecon.appendChild(this.datecdiv);
                for(k=0;k<7;k++){
                    //位每个表格创建索引
                    var idx=7*i+k;
                    //将当月的1号和星期进行匹配
                    var date=idx-newDate.dayOfWeek+1;
                    //如果索引小于0或者大于月份最大值就用空格代替
                    //判断条件=真的情况：假的情况
                    (date<=0||date>newDate.days_per_month[newDate.m])?date='':date=idx-newDate.dayOfWeek+1;
                    //显示date

                    this.datecp = document.createElement('p');
                    this.datecdiv.appendChild(this.datecp);
                    this.datecp.onclick=function(){
                        _this.selectdate(this);
                    };
                    if(date==newDate.d&&_this.datecurr){
                        this.datecp.className = 'datecurr'

                        this.datecspan = document.createElement('span');
                        this.datecp.appendChild(this.datecspan);
                        this.datecspan.innerText = date;
                    }else{
                        if(date){
                            this.datecspan = document.createElement('span');
                            this.datecp.appendChild(this.datecspan);
                            this.datecspan.innerText = date;
                        }else{
                            this.datecp.innerText = date;
                        }
                    }
                }
            }
        },
        //添加星期天
        addweek:function(){
            var _this=this;
            var week=['日','一','二','三','四','五','六'];
            this.dateweek = document.createElement('div');
            this.dateweek.className = 'dateweek';
            this.datetime.appendChild(this.dateweek);
            week.forEach(function(item,index){
                var datewdiv='datewdiv'+index;
                _this[datewdiv] = document.createElement('div');
                _this.dateweek.appendChild(_this[datewdiv]);
                _this[datewdiv].innerText = item;
            })
        },
        //上月
        prevmonth:function(){
            var _this=this;
            var today=new Date();
            if(_this.opt.date){
                today=new Date(_this.opt.date);
            }
            var newDate=_this.getDate(today);

            var yearmonth='';
            if(newDate.m>0){
                newDate.m-=1;
            }else{
                newDate.y-=1;
                newDate.m=11;
            }
            _this.opt.date=[newDate.y,newDate.m+1].map(_this.formatNumber).join('-');
            _this.datecon.remove();
            $('.datetitval').html(_this.opt.date);
            _this.datecurr=false;
            _this.addtable();
        },
        //下月
        nextmonth:function(){
            var _this=this;
            var today=new Date();
            if(_this.opt.date){
                today=new Date(_this.opt.date);
            }
            var newDate=_this.getDate(today);
            var yearmonth='';
            if(newDate.m<11){
                newDate.m+=1;
            }else{
                newDate.y+=1;
                newDate.m=0;
            }
            _this.opt.date=[newDate.y,newDate.m+1].map(_this.formatNumber).join('-');
            _this.datecon.remove();
            $('.datetitval').html(_this.opt.date);
            _this.datecurr=false;
            _this.addtable();
        },
        //选择日期
        selectdate:function(ele){
            var _this=this;
            if(_this.opt.callfunction){
                _this.opt.callfunction();
                if(_this.opt.zd){
                    return false;
                }
            }
            $('.datecurr').removeClass('datecurr');
            $(ele).addClass('datecurr');
            var valuetext=$('.datetitval').html();
            valuetext=valuetext+'-'+[$(ele).text()].map(_this.formatNumber);
            $(_this.opt.valueobj).html(valuetext);
            if(_this.opt.clickfunction){
                _this.opt.clickfunction();
            }
        },
        toggledate:function(ele){
            if($(ele).find('.datetime').css('display')=='none'){
                $('.datetime').hide();
                $(ele).find('.datetime').show()
            }else{
                $(ele).find('.datetime').hide()
            }
        }
    }


    // 暴露方法
    window.timeDate = timeDate;
})(window,document)