#   Giám sát PC
-   C:\ Label:WIN 11 Serial Number 1d0498e0: Space utilization
    -   % dung lượng đã sử dụng 
    -   vd: dung lượng ổ C: đã sử dụng 73%
-   C:\ Label:WIN 11 Serial Number 1d0498e0: Total space
    -   Tổng dung lượng 
    -   vd: dung lượng ổ C: là 237GB
-   C:\ Label:WIN 11 Serial Number 1d0498e0: Used space
    -   Dung lượng đã sử dụng
    -   vd: dung lượng ổ C: đã sử dụng 173GB
-   Physical Memory: Memory utilization
    -   % dung lượng RAM đã sử dụng 40%
-   Physical Memory: Total memory
    -   Tổng dung lượng RAM
    -   vd: dung lượng RAM là 8GB
-   Physical Memory: Used memory
    -   Dung lượng RAM đã sử dụng
    -   vd: ung lượng RAM đã sử dụng 3GB
<!-- -   Windows: CPU utilization
    -   % CPU đã sử dụng 
    -   vd: CPU đã sử dụng 40% -->
-   Windows: SNMP agent availability
    -   Availability of SNMP checks on the host. The value of this item corresponds to      availability icons in the host list.
        Possible value:
        0 - not available
        1 - available
        2 - unknown

-   Windows: System contact details
    -   The textual identification of the contact person for this managed node, together with information on how to contact this person. If no contact information is known, the value is the zero-length string.
-   Windows: System description
    -   A textual description of the entity. This value should include the full name and version identification of the system's hardware type, software operating-system, and networking software. It is mandatory that this only contain printable ASCII characters.
-   Windows: System location
    -   The physical location of this node (e.g., `telephone closet, 3rd floor'). If the location is unknown, the value is the zero-length string.
-   Windows: System name
    -   An administratively-assigned name for this managed node. By convention, this is the node's fully-qualified domain name. If the name is unknown, the value is the zero-length string.
-   Windows: System uptime (hardware)
    -   Uptime (hardware) thể hiện thời gian tính từ lúc máy tính hoặc thiết bị phần cứng được khởi động hoặc khởi động lại lần cuối.
    -   Nó thường được sử dụng để đo lường thời gian chạy liên tục của máy tính hoặc thiết bị phần cứng, mà không bị ảnh hưởng bởi việc kết nối mạng hoặc trạng thái hoạt động của dịch vụ mạng.
-   Windows: Uptime (network)
    -   Uptime (network) thể hiện thời gian tính từ lúc máy tính hoặc thiết bị mạng được kết nối vào mạng hoặc lần cuối cùng kết nối mạng lại.
    -   Thuật ngữ này liên quan đến thời gian hoạt động của kết nối mạng hoặc thiết bị mạng.
    -   Nó thường được sử dụng để đo lường thời gian kết nối mạng liên tục, mà không bị ảnh hưởng bởi việc khởi động lại máy tính hoặc thiết bị phần cứng.

#   Giám sát router
-   #1: CPU utilization
    -   % CPU đã sử dụng
-   Cisco IOS: Hardware serial number
    -   Số serial của router (4279256517)
-   Cisco IOS: Hardware model name
    -   Tên model của router (CISCO7206VXR)
-   Cisco IOS: Operating system
    -   Hệ điều hành của router (15.2(4)M7)
-   Cisco IOS: SNMP agent availability
    -   Giá trị của item này tương ứng với các biểu tượng available trong danh sách host.
        Giá trị có thể có:
        0 - không khả dụng
        1 - khả dụng
        2 - không xác định
-   Cisco IOS: SNMP traps (fallback)
    -   Các traps SNMP (fallback) được gửi từ router
-   Cisco IOS: System description
    -   Mô tả về router
-   Cisco IOS: System location
    -   Vị trí vật lý của router
-   Cisco IOS: System name
    -   Tên của router
-   Cisco IOS: System uptime (hardware).
-   Cisco IOS: System uptime (network)
-   I/O: Free memory
    -   Dung lượng bộ nhớ trống
-   I/O: Memory utilization
    -   % dung lượng bộ nhớ đã sử dụng
-   I/O: Used memory
    -   Dung lượng bộ nhớ đã sử dụng
-   I/O Cont Inlet: Temperature
    -   Nhiệt độ của I/O Cont Inlet (22)
-   I/O Cont Outlet: Temperature status
    -   Trạng thái nhiệt độ của I/O Cont Outlet (1)







# Chương 1: Cơ sở lý thuyết



# Chương 2: Phân tích thiết kế hệ thống giám sát
-   Phân tích các thành phần của hệ thống giám sát
    -   Zabbix Server
    -   SNMP Agent
    -   Cơ sở dữ liệu
    -   Web Interface thao tác với Zabbix Server
-   Phân tích kiến trúc hệ thống giám sát
    -   Cơ chế hoạt động của hệ thống giám sát
-   Các phần tử cơ bản của hệ thống giám sát
    -   Host
    -   Item
    -   Trigger
    -   Template
        -   là một tập hợp các item, trigger, graph, screen, application, host prototype, và discovery rule

    -   Host group
        -   là một tập hợp các host, host group có thể chứa các host group khác, tạo thành một cấu trúc cây, giúp cho việc quản lý các host dễ dàng hơn
    -   Template group
        -   được sử dụng để tổ chức và quản lý các mẫu (templates) của các thiết bị hoặc ứng dụng khác nhau. Template Group cho phép bạn nhóm các mẫu lại với nhau dựa trên một tiêu chí chung, chẳng hạn như nhóm các mẫu cho các máy chủ Windows, các mẫu cho các thiết bị mạng, các mẫu cho các ứng dụng cụ thể, v.v.
-   Các chức năng cơ bản của hệ thống giám sát:
    -   Tạo và quản lý các host
    -   Tạo và quản lý các item
    -   Tạo và quản lý các trigger
    -   Tạo và quản lý các host group
    -   Tạo và quản lý các template
    -   Tạo và quản lý các template group
    -   Tạo và quản lý các user
    -   Cảnh báo khi có sự cố xảy ra
    -   Hiển thị các biểu đồ thống kê
    

# Chương 3: Triển khai hệ thống giám sát
-   Phát biểu bài toán
    -   Mô tả bài toán
        -   
    -   Mô tả môi trường triển khai
    -   Mô tả các chức năng cần triển khai
-   Môi trường triển khai:
    -   zabbixsrv:
        -   note: máy chủ giám sát thiết bị mạng, cài đặt zabbix server, 
        -   OS: Ubuntu 20.04
        -   IP:
    -   Pc1:
        -   note: máy tính cá nhân, cài đặt zabbix agent, web interface
        -   OS: Windows 11
        -   IP:
    -   Router1:
        -   note: thiết bị mạng, cài đặt zabbix agent
        -   OS: Cisco IOS
        -   IP:
-   Triển khai cấu hình hệ thống giám sát:
    -   Cấu hình Zabbix Server trên Server Ubuntu
    -   Cấu hình SNMP Agent trên PC1
    -   Cấu hình SNMP agent trên Router1
    -   Cấu hình Web Interface trên PC1, kết nối đến Zabbix Server
        -    Để sử dụng Web Interface, ta cần cài đặt NodeJS và Git trên PC1
        -    Sau khi cài đặt xong, ta tiến hành clone project về máy PC1
            -   `git clone https://github.com/dinhvan2310/pbl4_snmp_ui.git
        -    Bây giờ project đã được clone về máy PC1, ta tiến hành truy cập vào thư mục chứa project và mở file .env.development lên để cấu hình
        -    Cấu hình file .env.development
            -   REACT_APP_API_URL=http://{địa chỉ ip của zabbix server}/zabbix/api_jsonrpc.php
        -   Sau khi cấu hình xong, ta tiến hành cài đặt các thư viện cần thiết cho project bằng cách mở terminal lên và chạy lệnh sau:
            -   `npm install`
    -   Cấu hình Web Interface để giám sát Router1
        -   Tạo host Router1
        -   Tạo các item để giám sát Router1
    -   Cấu hình Web Interface thiết lập các thông số để giám sát PC1
        -   Tạo host PC1
        -   Tạo các item để giám sát PC1
    -   Cấu hình Web Interface để giám sát Zabbix Server
        -   Tạo host Zabbix Server
        -   Tạo các item để giám sát Zabbix Server
-   Triển khai kiểm thử hệ thống giám sát
    -   Kiểm thử giám sát Router1
    -   Kiểm thử giám sát PC1
# Chương 4: Kết luận
-   Tổng kết
-   Hạn chế
-   Hướng phát triển
# Chương 5: Tài liệu tham 



