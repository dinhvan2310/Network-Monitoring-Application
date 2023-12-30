-   .1.3.6.1.2.1.25.2.2.0: dung lượng RAM (kB)
-   .1.3.6.1.2.1.25.1.1.0: thời gian hoạt động của máy 






# Chương 1: Cơ sở lý thuyết

# Chương 2: Phân tích thiết kế hệ thống giám sát
-   Phân tích các thành phần của hệ thống giám sát
    -   Zabbix Server
    -   SNMP Agent
    -   Cơ sở dữ liệu
    -   Web Interface thao tác với Zabbix Server
-   Phân tích kiến trúc hệ thống giám sát
    -   Cơ chế hoạt động của hệ thống giám sát
-   Phân tích chức năng của Web Interface
    -   Tạo các host
    -   Tạo các item
    -   Tạo các graph
    -   Tạo các template
    -   Tạo các user
    -   Tạo các host group
    -   Tạo các template group
    -   ...
# Chương 3: Triển khai hệ thống giám sát
-   Môi trường triển khai:
    -   PC1: 
        -   Thông tin về PC1:
            -   CPU: Intel Core i5-8250U
            -   RAM: 8GB
            -   Ổ cứng: 256GB SSD
            -   Hệ điều hành: Windows 10
            -   Địa chỉ IP: 
    -   Router1:
        -   Thông tin về Router1:
            -   CPU: Intel Core i5-8250U
    -   Ubuntu Server:
        -   Thông tin về Ubuntu Server:
            -   CPU: Intel Core i5-8250U
            -   RAM: 8GB
            -   Ổ cứng: 256GB SSD
            -   Hệ điều hành: Ubuntu 22.04
    -   Zabbix Server: 
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
    -   Cấu hình Web Interface để giám sát PC1
        -   Tạo host PC1
        -   Tạo các item để giám sát PC1
-   Triển khai giám sát thông qua Web Interface
    -   Giám sát PC1 thông qua Web Interface
        
    -   Giám sát Router1 thông qua Web Interface
# Chương 4: Kết luận
-   Tổng kết
-   Hạn chế
-   Hướng phát triển
# Chương 5: Tài liệu tham 



