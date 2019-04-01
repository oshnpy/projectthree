require(["./js/config.js"], function() {
    require(["mui", "better", "flexible"], function(mui, BScroll, flex) {
        var page = 1,
            pageSize = 5,
            total = 0;
        var BScroll = new BScroll(".boxAll", {
            probeType: 2,
            click: true
        });
        init();
        //渲染饭圈头条
        function init() {
            mui.ajax("/find", {
                dataType: "json",
                type: "get",
                data: {
                    page: 1,
                    pageSize: pageSize
                },
                success: function(data) {
                    if (data.code == 0) {
                        total = data.total;
                        render(data.data);
                    }
                }
            })
        }
        //渲染我的爱豆以及其他模块


        function inits() {
            mui.ajax("/findHeader", {
                dataType: "json",
                type: "get",
                data: {
                    page: page,
                    pageSize: pageSize
                },
                success: function(data) {
                    if (data.code == 0) {
                        total = data.total;
                        renderHeaders(data.data);
                    }
                }
            })
        }

        function renderHeaders(data) {
            var html = "";
            data.forEach(function(item) {
                html += `<li>
                            <p><img src="img/section.png" alt="" class="imgs"></p>
                            <h6>${item.content}</h6>
                        </li>`;
            })

            renderList.innerHTML += html;

        }
        //渲染数据
        function render(data) {
            var html = "";
            data.forEach(function(item) {
                html += `<li>
                            <p><img src="img/footer.png" alt=""><span>
                                ${item.name}
                            </span></p>
                            <div class="contents">${item.content}</div>
                            <img src="img/section.png" alt="" class="imgs">
                        </li>`;
            })
            renderList.innerHTML += html;
            BScroll.refresh();
        }



        //上拉加载
        scroll();

        function scroll() {
            BScroll.on("scroll", function() {
                if (this.y < this.maxScrollY - 50) {
                    pullUp.innerHTML = "释放加载更多";
                    pullUp.classList.add("flip");
                } else {
                    pullUp.innerHTML = "上拉加载";
                    pullUp.classList.remove("flip");
                }
            })
            BScroll.on("scrollEnd", function() {
                if (pullUp.classList.contains("flip")) {
                    pullUp.classList.remove("flip");
                    pullUp.innerHTML = "上拉加载";
                    pullUpFn();
                }
            })
        }
        //上拉加载函数
        function pullUpFn() {
            page++;
            init();
        }
        //点击各个模块
        mui("#list").on("tap", "li", function() {
            if (this.innerHTML == "我的爱豆") {
                renderList.classList.add("active");
                page = 0;
                renderList.innerHTML = "";
                page++;
                inits();
            } else if (this.innerHTML == "饭圈头条") {
                renderList.classList.remove("active");
                renderList.innerHTML = "";
                init();
            } else if (this.innerHTML == "饭圈广场") {
                page = 0;
                renderList.innerHTML = "";
                page++;
                inits();
            } else if (this.innerHTML == "爱豆同款") {
                page = 0;
                renderList.innerHTML = "";
                page++;
                inits();
            }
        })

    })
})