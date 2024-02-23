###   Item trong zabbix: là thành phần cơ bản được sử dụng để thu thập dữ liệu từ các thiết bị. Item mang một số thuộc tính cơ bản như sau:
    - Name: Tên của item, đây là định danh duy nhất để xác định item trong hệ thống giám sát
    - Type: Loại item (Zabbix hỗ trợ nhiều loại item khác nhau), ví dụ như: Zabbix agent, SNMP agent, ...
        -   Zabbix agent: là một phần mềm được cài đặt trên các thiết bị cần giám sát, nó sẽ thu thập dữ liệu từ các thiết bị và gửi về zabbix server để xử lý
        -   SNMP agent: là một phần mềm được cài đặt trên các thiết bị cần giám sát, nó sẽ thu thập dữ liệu từ các thiết bị và gửi về zabbix server để xử lý
    - Key: dùng để xác định item
    - Type of information: Loại dữ liệu thu thập được, bao gồm các loại: Numeric (float), Numeric (unsigned), Character (ký tự), Log (nhật ký), Text (văn bản)
    -   Units: Đơn vị của dữ liệu thu thập được
    -   Update interval (in sec): Thời gian cập nhật dữ liệu
    -   Status: Trạng thái của item
        -   có 2 trạng thái: Enabled, Disabled
    -   History storage period (in days): Thời gian lưu trữ dữ liệu
    -   Trends storage period (in days): Thời gian lưu trữ dữ liệu xu hướng
        -   Phân biệt history và trends: History và trends đều là 2 phương thức dùng để lưu trữ các dữ liệu đã thu tập được trong CSDL Zabbix, nhưng chúng có sự khác biệt
            -   History: là cơ chế lưu trữ dữ liệu theo từng giá trị của item, nó sẽ lưu trữ tất cả các giá trị thu thập được của item trong khoảng thời gian được cấu hình. Ví dụ: Nếu item được cấu hình thu thập dữ liệu mỗi 30s, thì trong khoảng thời gian 1 ngày, nó sẽ thu thập được 2880 giá trị của item. Tất cả các giá trị này sẽ được lưu trữ trong bảng history của CSDL Zabbix.
            -   Trends: Cứ mỗi giờ thì zabbix server sẽ thu gom các giá trị từ các table history và tính toán giá trị min, avg, max cho khung thời gian một giờ. Có thể coi trends là một kĩ thuật lưu trữ của history bằng cách chỉ tính các giá trị min, max, avg. Trends thường được set giá trị lưu trữ lâu hơn history. 
                        Các item chuỗi (string) như log, text, character thì không có trends.
                        Các giá trị lâu hơn thời gian quy định của trends sẽ bị xoá đi
    -   Description: Mô tả về item 

###   Trigger trong zabbix: là một thành phần quan trọng được sử dụng để xác định và cảnh báo về các sự kiện hoặc trạng thái không mong muốn trong hệ thống giám sát. Trigger kiểm tra các giá trị từ các mục (item) trong Zabbix để xác định liệu có sự việc xảy ra ngoài mong đợi hay không, và nếu có, nó sẽ kích hoạt một cảnh báo. Một trigger mang một số thuộc tính cơ bản sau:
        1.  Name: Tên của trigger
        2.  Expression: Biểu thức để xác định trigger
            -   là biểu thức điều kiện được định nghĩa để xác định trạng thái không mong muốn. Biểu thức này sử dụng các giá trị từ các mục (item) và các toán tử logic để kiểm tra điều kiện. Ví dụ, một biểu thức có thể là "{last(item:key)}<20", đại diện cho trạng thái khi giá trị của mục thấp hơn 20.
            -   Các toán tử logic được sử dụng trong biểu thức:
                -   =, !=, >, >=, <, <=,...
            -   Các hàm được sử dụng trong biểu thức:
                -   last(): lấy giá trị mới nhất của item
                        -   last(#): lấy giá trị mới nhất của item trong khoảng thời gian # (giây)
                        -   last(#m): lấy giá trị mới nhất của item trong khoảng thời gian # (phút)
                -   min(#): lấy giá trị min của item trong khoảng thời gian # (giây)
                -   max(#): lấy giá trị max của item trong khoảng thời gian # (giây)
                -   avg(#): lấy giá trị trung bình của item trong khoảng thời gian # (giây)
                -   ...
            
        3.  Severity: Mức độ nghiêm trọng của trigger
            -   có 5 mức độ nghiêm trọng: Not classified, Information, Warning, Average, High, Disaster
        4.  Status: Trạng thái của trigger
            -   có 2 trạng thái: Enabled, Disabled
        5.  Description: Mô tả về trigger



###   Template: là một thành phần quan trọng được sử dụng để tạo và quản lý các cầu hình chuẩn cho việc giám sát. Template chứa các item, trigger giúp đơn giản hoá việc triển khai và quản lý hệ thống giám sát. Template phải được đặt trong một hoặc nhiều template group

###   Template Group: là một khái niệm được sử dụng để tổ chức và quản lý các template (mẫu) trong hệ thống giám sát. Template Group cho phép bạn nhóm các template liên quan lại với nhau để dễ dàng quản lý và áp dụng chúng cho các host cụ thể.

###   Host: đại diện cho một thiết bị, máy chủ hoặc ứng dụng cần được giám sát. Host là đơn vị cơ bản để thu thập dữ liệu và theo dõi trạng thái của các thành phần trong mạng hoặc hệ thống. Các thuộc tính của host bao gồm:
    1.   Host name: Tên của host, đây là định danh duy nhất để xác định host trong hệ thống giám sát

    2.   Template: Template được áp dụng cho host, nó sẽ chứa các item, trigger giúp đơn giản hoá việc triển khai và quản lý hệ thống giám sát
    2.   Items: Danh sách các item được áp dụng cho host
    3.   Triggers: Danh sách các trigger được áp dụng cho host    
        -   Các item và trigger sẽ có 2 cách áp dụng cho host:
            -   Áp dụng trực tiếp cho host
            -   Áp dụng thông qua template

    3.   IP address: Địa chỉ IP của host để kết nối và thu thập dữ liệu từ đó
    4.   Port: Cổng kết nối
    5.   Status: Trạng thái của host
        -   có 2 trạng thái: Enabled, Disabled
    6.   Snmp version: Phiên bản SNMP
        -   có 3 phiên bản: v1, v2, v3
        -   v3 là phiên bản mới nhất, có nhiều tính năng hơn v1, v2
        -   v3 có 3 chế độ: AuthPriv, AuthNoPriv, NoAuthNoPriv
            a.  AuthPriv: có xác thực và mã hóa dữ liệu
            b.  AuthNoPriv: có xác thực nhưng không mã hóa dữ liệu
            c.  NoAuthNoPriv: không có xác thực và mã hóa dữ liệu
    6.  Security name: Security name của SNMP
    6.  Security level: Security level của SNMP
    6,  Auth protocol: Auth protocol của SNMP
    6.  Auth password: Auth password của SNMP
    6.  Priv protocol: Priv protocol của SNMP
    6.  Priv password: Priv password của SNMP
    7.   Community: mã community của SNMP
    8.   Host groups: Danh sách các host group mà host thuộc về

###   Host Group: là một khái niệm được sử dụng để tổ chức và quản lý các host trong hệ thống giám sát. Host Group cho phép bạn nhóm các host liên quan lại với nhau để dễ dàng quản lý..


###   User có 2 loại:
    1.  Super Admin: là người dùng có quyền cao nhất trong hệ thống giám sát, có thể thực hiện tất cả các thao tác trong hệ thống giám sát (bao gồm cả việc tạo, xóa, sửa các user khác)
    2.  User: là người dùng có quyền xem các thông tin trong hệ thống giám sát, không có quyền thực hiện các thao tác cấu hình trong hệ thống giám sát
