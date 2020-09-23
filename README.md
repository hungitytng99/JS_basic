# Java script cơ bản
1. Built in function:
- alert
- console:
- confirm: xác nhận khi truy cập(OK, CANCEL). 
    var isConfirm = confirm('confirm'); // return true/false
- prompt: xác nhận khi truy cập(input, OK, CANCEL).
- set timeout(setTimeout(function() {}), time): sau time (ms) mới thực hiên function. 1 lần  
- set interval(setInterval(function() {}), time)): thực thi liên tục func sau time ms.

2. Toán tử:
- số học - arithmetic: + - * **(lũy thừa) / % ++ --
- gán - asignment:
- so sánh - comparision: 
+ == , != 
    tương đối: 1 == '1'
+ ===, !==
    tuyệt đối: 1 !== '1' (so sánh cả kiểu dữ liệu)
- logic - logical: &&(and)  ||(or)  !(not)

2. Kiểu dữ liệu 
- Nguyên thủy:
+ Number 
+ String
+ Boolean
+ Undefined
+ Null
+ Symbol(có đặc tính unique):
var id = Symbol('id') != var id2 = Symbol('id');

- Phức tạp:
+ function
+ object: 
    var object = {
        key : value,
    };
+ array:
    var array = [
        array1,
    ]
- typeof : console.log(typeof array);

3. Chuỗi:
- Cách tạo : 
+ var string = string;
+ var string = new String('string');
Template string:  `Toi la ${variable}`

4. ARRAY
- join(',' ): nối array với ', '
- pop push(thêm 1 nhiều p tử vào cuối mảng) shift unshift(thêm 1 nhiều p tử vào đầu mảng)
- splicing(start, end, string): xóa end phần tử từ start, rồi chèn string vào vị trí start.
- concat: nối chuỗi
- slicing: cắt dữ liệu ra mảng mới
- vòng for():
    for(var param of arguments){}: lấy value
    for in: lấy key
- array methods:
    + forEach(function(từng phần tử, index){}): 
    + every(): tất cả phần từ thỏa mãn 1 điều kiện.
    + some(): 1 phần tử thỏa mãn điều kiện.
    + find(): trả về 1 phần tử thỏa mãn.
    + filter(): trả về tất phần tử thỏa mãn.
    + map(function, index, originArray): trả về 1 mảng có giá trị như mảng cũ.
        + map nhận từng phần tử, trả về thành params trong function. function xử lý. trả về gì thì biến mới nhận giá trị đó.
    + reduce(function(){}, initialValue): nhận về 1 giá trị.
- Làm phẳng mảng: 

5. FUNCTION:
- khi func trùng tên: func sau ghi đè func định  nghĩa trước.
- định nghĩa hàm trong hàm: chỉ dùng trong func cha
- Phân loại: 
+ declaration function: 
    function name(){
    }
+ expression function: không thẻ gọi trước khi định nghĩa
    var variable = function(){
    }
    setTimeout(function(){
    });
+ includes: string và array
    a.includes('b', start) : a có chứa kí tự b từ start không ?

6. Object constructor + protype:
    object.prototype.className = 'name';
//thêm thuộc tính/phương thức mới cho đối tượng.

7. Toán tử 3 ngôi - Terary operator:
    a > b ? 1 : 0
8. Callback:là hàm
            được truyền qua đối số
            được gọi lại    

9. Đệ quy:
- Điểm dừng
- Logic

# HTML DOM
3 thành phần
- Element: VD: a, h1, ..
    + contentediable="" : có thể chỉnh sửa các thẻ như 1 thẻ input.
    + childElementCount: đếm phần tử element trong element node.
    + noteType : là element, atribute hay text node.
    + tabIndex: đánh thứ tự nhảy đến đâu bằng tab.
    + _proto_: chỉ lq đến đối tượng.
    + classList: trả về danh sách các class.
        [add, contains, remove, toggle] <=> [thêm, chứa ,xóa, có class thêm - không có gỡ bỏ]
        

- Attribute : nằm ở thẻ mở tag( id = "", class = "")
    
- Text: <a> Text </a>
- Phương thức: 
document.(function):
    + write('hello')
        *selection: id, class, tag, css selector, html collection*
    + getElementById('id'): trả về 1 phần tử duy nhất có id = 'id'.
    + getElementsByClassName('classname'): trả về tất cả elemnt có class = 'classname'.
    + getElementByTagName('p'): tag = 'p'
    + CSS selector: querySelector('.healding'): chọn theo id css
                    querySelectorAll('.healding'):
    VD: input['name="name"']
    + HTML selection: chỉ lấy được 1 số thẻ(a, p, form, ...)
                    forms['id-form'] or forms.form;
    + [element].innerText: trình duyệt có gì thì hiển thị đó.
    + [element].innerText: nội dung gốc.

[element].(function):
    + element.style.property = 'value';
        thay đổi style viết ngắn gọn:
            Object.asign( element.style,{
                property_1: 'value_1',
                property_2: 'value_2',
            });
2. DOM events:
- Attribute events.
- Assign event using the elements.

- preventDefault()  ngăn sự kiện mặc định.
- stopPropagation() ngăn nổi bọt(hành vi cha ảnh hưởng hành vi thẻ con).



** Lưu ý:
1.  result = A && B && C;
    console.log(result); //output: C
- Giải thích: kiếm tra A thuộc 6 giá trị nguyên thủy => không thuộc, gán B vào result. nếu 1 trong các phần tử thuộc 6 giá trị => gán luôn giá trị đó cho result.
    if(1 trong 6 value => true, không phải => false)
2.  Kiếm tra NaN:    isNaN(variable);
    Kiểm tra Arr:    Array.isAray([]);
3. Polfill? 
    include: có thể một số trình duyệt không hỗ trợ
