
/* cartData = [
      {'name':'广西融安青金桔', 'price': 30, 'img' : '../img/fruit2.png', 'number': 1},
      {'name':'秘鲁进口红提', 'price': 78, 'img' : '../img/fruit3.png', 'number': 1}
  ] 
  */
function cartAdd(arrayData, m, n) {
  let jsonData = {};
  jsonData = arrayData[m].products[n];
  jsonData.number = 1;

  if (localStorage.getItem("cartData")) {
    //如果有 取出来用
    let get_cartData = JSON.parse(localStorage.getItem("cartData"));

    // 重复点击购物车，修改商品数量
    for (let i = 0; i < get_cartData.length; i++) {
      if (get_cartData[i].name == jsonData.name) {
        get_cartData[i].number += 1;
        break;
      } else {
        // 点击新的商品，加到购物车中
        if (i == get_cartData.length - 1) {
          get_cartData.push(jsonData);
          break;
        }
      }
    }


    if (get_cartData.length == 0) {
      get_cartData.push(jsonData);
    }
    localStorage.removeItem("cartData");
    localStorage.setItem("cartData", JSON.stringify(get_cartData));
  } else {
    //如果没有 cartData定义一个空对象
    this.cartData = [];
    this.cartData.push(jsonData);

    localStorage.setItem("cartData", JSON.stringify(this.cartData));
  }
}


function getTime() {
  var date = new Date();

  // 年、月、日
  var year = date.getFullYear();
  var month = date.getMonth() + 1;
  var day = date.getDate();

  // 时、分、秒
  var hour = date.getHours();
  var minute = date.getMinutes();
  var second = date.getSeconds();

  // 实时显示
  var element = document.querySelector(".currentTime");
  element.innerHTML =
    "<h1>" +
    "当前时间：" +
    year +
    "年" +
    month +
    "月" +
    day +
    "日" +
    "</h1>" +
    "<h1>" +
    hour +
    "时" +
    minute +
    "分" +
    second +
    "秒" +
    "</h1>";
}
setInterval(function () {
  getTime();
}, 1000);

window.addEventListener("load", function () {
  // 1. 获取元素
  var arrow_l = document.querySelector(".arrow-l");
  var arrow_r = document.querySelector(".arrow-r");
  var focus = document.querySelector(".focus");
  var focusWidth = focus.offsetWidth;

  let floor = document.getElementById("floor");
  // 2. 鼠标经过focus 就显示隐藏左右按钮
  focus.addEventListener("mouseenter", function () {
    arrow_l.style.display = "block";
    arrow_r.style.display = "block";
    clearInterval(timer);
    timer = null; // 清除定时器变量
  });
  focus.addEventListener("mouseleave", function () {
    arrow_l.style.display = "none";
    arrow_r.style.display = "none";
    timer = setInterval(function () {
      //手动调用点击事件
      arrow_r.click();
    }, 2000);
  });
  // 3. 动态生成小圆圈  有几张图片，我就生成几个小圆圈
  var ul = focus.querySelector("ul");
  var ol = focus.querySelector(".circle");
  // console.log(ul.children.length);
  for (var i = 0; i < ul.children.length; i++) {
    // 创建一个小li
    var li = document.createElement("li");
    // 记录当前小圆圈的索引号 通过自定义属性来做
    li.setAttribute("index", i);
    // 把小li插入到ol 里面
    ol.appendChild(li);
    // 4. 小圆圈的排他思想 我们可以直接在生成小圆圈的同时直接绑定点击事件
    li.addEventListener("click", function () {
      // 干掉所有人 把所有的小li 清除 current 类名
      for (var i = 0; i < ol.children.length; i++) {
        ol.children[i].className = "";
      }
      // 留下我自己  当前的小li 设置current 类名
      this.className = "current";
      // 5. 点击小圆圈，移动图片 当然移动的是 ul
      // ul 的移动距离 小圆圈的索引号 乘以 图片的宽度 注意是负值
      // 当我们点击了某个小li 就拿到当前小li 的索引号
      var index = this.getAttribute("index");
      // 当我们点击了某个小li 就要把这个li 的索引号给 num
      num = index;
      // 当我们点击了某个小li 就要把这个li 的索引号给 circle
      circle = index;

      animate(ul, -index * focusWidth);
    });
  }
  // 把ol里面的第一个小li设置类名为 current
  ol.children[0].className = "current";
  // 6. 克隆第一张图片(li)放到ul 最后面
  var first = ul.children[0].cloneNode(true);
  ul.appendChild(first);
  // 7. 点击右侧按钮， 图片滚动一张
  var num = 0;
  // circle 控制小圆圈的播放
  var circle = 0;
  // flag 节流阀
  var flag = true;
  arrow_r.addEventListener("click", function () {
    if (flag) {
      flag = false; // 关闭节流阀
      // 如果走到了最后复制的一张图片，此时 我们的ul 要快速复原 left 改为 0
      if (num == ul.children.length - 1) {
        ul.style.left = 0;
        num = 0;
      }
      num++;
      animate(ul, -num * focusWidth, function () {
        flag = true; // 打开节流阀
      });
      // 8. 点击右侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
      circle++;
      // 如果circle == 4 说明走到最后我们克隆的这张图片了 我们就复原
      if (circle == ol.children.length) {
        circle = 0;
      }
      // 调用函数
      circleChange();
    }
  });

  // 9. 左侧按钮做法
  arrow_l.addEventListener("click", function () {
    if (flag) {
      flag = false;
      if (num == 0) {
        num = ul.children.length - 1;
        ul.style.left = -num * focusWidth + "px";
      }
      num--;
      animate(ul, -num * focusWidth, function () {
        flag = true;
      });
      // 点击左侧按钮，小圆圈跟随一起变化 可以再声明一个变量控制小圆圈的播放
      circle--;
      // 如果circle < 0  说明第一张图片，则小圆圈要改为第4个小圆圈（3）
      if (circle < 0) {
        circle = ol.children.length - 1;
      }
      circle = circle < 0 ? ol.children.length - 1 : circle;
      // 调用函数
      circleChange();
    }
  });

  function circleChange() {
    // 先清除其余小圆圈的current类名
    for (var i = 0; i < ol.children.length; i++) {
      ol.children[i].className = "";
    }
    // 留下当前的小圆圈的current类名
    ol.children[circle].className = "current";
  }
  // 10. 自动播放轮播图
  var timer = setInterval(function () {
    //手动调用点击事件
    arrow_r.click();
  }, 2000);

  // 渲染mock.js数据


  let container_content = ""
  for (let i = 0; i < categories.length; i++) {

    container_content += `
      <div class="container">
            <div class="box_hd">
                <div class="title">
                    <h3">${categories[i].title}</h3>
                </div>

                <div class="chakangengduo">
                    <a href="#">
                        <h5 class="iconfont icon-more-after">查看更多</h5>
                    </a>
                </div>
            </div>

            <div class="box_bd">
                <div class="tab_content">
                    <div class="tab_list_item">
                        <div class="col_210">
                            <a href="#">
                                <img src="img/${i + 1}.png" alt="">
                            </a>
                        </div>`

    for (let j = 0; j < 4; j++) {
      container_content += `<div class="col_244">
                            <div class="title">
                                <h3>${categories[i].products[j].name}</h3>
                            </div>

                            <div class="image">
                                <a href="#">
                                    <img src=${categories[i].products[j].img} alt="">
                                </a>
                            </div>

                            <div class="price iconfont icon-rmb">
                                <label for="">${categories[i].products[j].price}</label>
                                <span class="cart iconfont icon-cart-add" onclick="cartAdd(categories, ${i}, ${j})"></span>
                            </div>
                        </div>`
    }

    container_content += `</div>
                </div>
            </div>
            
        </div>
    `;

    floor.innerHTML = container_content
    // console.log(floor);



  }

  // 鼠标移入，显示购物车；鼠标移出，隐藏购物车
  var carts = document.querySelectorAll(".cart");
  var prices = document.querySelectorAll(".price");

  for (let i = 0; i < prices.length; i++) {
    prices[i].addEventListener("mouseenter", function () {
      carts[i].style.display = "inline-block";
    });
    // console.log(carts[i]);
    prices[i].addEventListener("mouseleave", function () {
      carts[i].style.display = "none";
    });
  }
});
