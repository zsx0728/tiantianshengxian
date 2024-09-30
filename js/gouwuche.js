// 修改localStorage的商品信息
function change_localStorage(id_number, number, flag) {
  let get_cartData = JSON.parse(localStorage.getItem("cartData"));

  let name = document.getElementById(id_number + 'name').innerHTML.trim();

  for (let i = 0; i < get_cartData.length; i++) {
    if (name == get_cartData[i].name) {
      if (flag == "del") {
        get_cartData[i].number -= number;
        if (get_cartData[i].number == 0) {
          get_cartData.splice(i, 1);
        }
      } else if (flag == "add") {
        get_cartData[i].number += number;
      }
      localStorage.setItem("cartData", JSON.stringify(get_cartData));
    }
  }

}

// 点击商品首列的勾选框，更新已选择商品数量checkedgoods，和总价totalprice
function checkboxOnclick(checkbox, id_number) {
  let checkedgoods = parseInt(document.getElementById('checkedgoods').innerHTML);
  let footer_totalprice = parseInt(document.getElementById('totalprice').innerHTML);
  let body_totalprice = parseInt(document.getElementById(id_number + 'totalprice').innerHTML);
  let num = parseInt(document.getElementById(id_number).value);


  if (checkbox.checked == true) {
    checkedgoods += num;
    footer_totalprice += body_totalprice;

    document.getElementById('checkedgoods').innerHTML = checkedgoods.toString();
    document.getElementById('totalprice').innerHTML = footer_totalprice.toString();

    let selectallbtn = document.getElementById('selectallbtn');
    let items = document.querySelectorAll('input[name="item[]"]');
    let checked_num = 0;
    for (let i = 0; i < items.length; i++) {
      if (items[i].checked == true) {
        checked_num += 1;
      }
    }
    if (checked_num == items.length) {
      selectallbtn.checked = true;
    } else {
      selectallbtn.checked = false;
    }

  } else {
    checkedgoods -= num;
    footer_totalprice -= parseInt(body_totalprice);

    document.getElementById('checkedgoods').innerHTML = checkedgoods.toString();
    document.getElementById('totalprice').innerHTML = footer_totalprice.toString();
    selectallbtn.checked = false;
  }
}

// 全选按钮
function selectall(checkbox) {
  let items = document.querySelectorAll('input[name="item[]"]');

  // let get_cartData = JSON.parse(localStorage.getItem("cartData"));

  if (checkbox.checked == true) {
    for (let i = 0; i < items.length; i++) {
      if (items[i].checked == false) {
        // let num = parseInt(document.getElementById(i + 100).value);
        items[i].checked = true;
        checkboxOnclick(items[i], i + 100);
      }
    }
  } else {
    for (let i = 0; i < items.length; i++) {
      if (items[i].checked == true) {
        // let num = parseInt(document.getElementById(i + 100).value);
        items[i].checked = false;
        checkboxOnclick(items[i], i + 100);
      }
    }
  }
}

// 点击-，减少商品数量
function change_goods_num_del(id_number) {
  let num = parseInt(document.getElementById(id_number).value);
  let price = parseInt(document.getElementById(id_number + 'price').innerHTML);
  let body_totalprice = parseInt(document.getElementById(id_number + 'totalprice').innerHTML);
  if (num == 1) {
    return;
  }

  num -= 1;
  body_totalprice = price * num;

  document.getElementById(id_number).value = num;
  document.getElementById(id_number + 'totalprice').innerHTML = body_totalprice.toString();

  let current_checkbox = document.getElementById(id_number + 'checkbox');
  let footer_totalprice = parseInt(document.getElementById('totalprice').innerHTML);
  let checkedgoods = parseInt(document.getElementById('checkedgoods').innerHTML);

  if (current_checkbox.checked) {
    footer_totalprice -= price;
    document.getElementById('totalprice').innerHTML = footer_totalprice.toString();

    checkedgoods -= 1;
    document.getElementById('checkedgoods').innerHTML = checkedgoods.toString();
  }

  change_localStorage(id_number, 1, "del")
}

// 点击+，增加商品数量
function change_goods_num_add(id_number) {
  let num = parseInt(document.getElementById(id_number).value);
  let price = parseInt(document.getElementById(id_number + 'price').innerHTML);
  let body_totalprice = parseInt(document.getElementById(id_number + 'totalprice').innerHTML);

  num += 1;
  body_totalprice = price * num;
  console.log(num);

  document.getElementById(id_number).value = num;
  document.getElementById(id_number + 'totalprice').innerHTML = body_totalprice.toString();

  let current_checkbox = document.getElementById(id_number + 'checkbox');
  let footer_totalprice = parseInt(document.getElementById('totalprice').innerHTML);
  let checkedgoods = parseInt(document.getElementById('checkedgoods').innerHTML);

  if (current_checkbox.checked) {
    footer_totalprice += price;
    document.getElementById('totalprice').innerHTML = footer_totalprice.toString();

    checkedgoods += 1;
    document.getElementById('checkedgoods').innerHTML = checkedgoods.toString();
  }
  change_localStorage(id_number, 1, "add")
}

// 删除一行数据
function del_item_box(id_number) {
  let item_box = document.getElementById(id_number + 'item_box');
  let body_totalprice = parseInt(document.getElementById(id_number + 'totalprice').innerHTML);
  let num = parseInt(document.getElementById(id_number).value);
  let checkbox = document.getElementById(id_number + 'checkbox');

  if (checkbox.checked == true) {
    let footer_totalprice = parseInt(document.getElementById('totalprice').innerHTML);
    let checkedgoods = parseInt(document.getElementById('checkedgoods').innerHTML);
    checkedgoods -= num;
    footer_totalprice -= body_totalprice;
    document.getElementById('totalprice').innerHTML = footer_totalprice.toString();
    document.getElementById('checkedgoods').innerHTML = checkedgoods.toString();
  }

  change_localStorage(id_number, num, "del");
  item_box.remove();
}


// 渲染页面
window.addEventListener("load", function () {
  let tbody = document.getElementById("tbody_id");
  // console.log(tbody);


  if (localStorage.getItem("cartData")) {
    let get_cartData = JSON.parse(localStorage.getItem("cartData"));

    for (let i = 0; i < get_cartData.length; i++) {
      let total_price = get_cartData[i].number * get_cartData[i].price

      tbody.innerHTML += `
          <tr class="item-box" id=${(i + 100) + 'item_box'}>
            <td class="col col-check">
              <input type="checkbox" name="item[]" value=0 class="icon-checkbox" id=${i + 100 + 'checkbox'} onclick="checkboxOnclick(this, ${i + 100})" />
            </td>
            <td class="col col-img">
              <a href="#">
                <img src=${get_cartData[i].img} alt="" />
              </a>
            </td>
            <td class="col col-name" id=${(i + 100) + 'name'}>
            ${get_cartData[i].name}
            </td>
            <td class="col col-market-price">
              &yen; <label for="">${get_cartData[i].price}</label>
            </td>
            <td class="col col-price">&yen; <label for="">${get_cartData[i].price}</label></td>
            <td class="col col-purchase-price">
              &yen; <label for="" id=${(i + 100) + 'price'} >${get_cartData[i].price}</label>
            </td>
            <td class="col col-num">
              <div class="change-goods-num clearfix">
                <div class="change-goods-num-del" onclick="change_goods_num_del(${i + 100})">
                  <i class="iconfont">&#xe840;</i>
                </div>

                <input type="number" id=${i + 100}  value=${get_cartData[i].number} />

                <div class="change-goods-num-add" onclick="change_goods_num_add(${i + 100})">
                  <i class="iconfont">&#xe835;</i>
                </div>
              </div>
            </td>
            <td class="col col-total">&yen; <label for="" id=${(i + 100) + 'totalprice'}>${total_price}</label></td>
            <td class="col col-action">
              <span class="iconfont icon-delete" id=${(i + 100) + 'del'} onclick="del_item_box(${(i + 100)})"></span>
            </td>
          </tr>
`;
    }

  } else {
    return;
  }
});
