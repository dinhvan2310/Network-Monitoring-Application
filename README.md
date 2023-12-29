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
-   Mô hình triển khai
    -   PC1: 
        -   Thông tin về PC1:
            -   CPU: Intel Core i5-8250U
            -   RAM: 8GB
            -   Ổ cứng: 256GB SSD
            -   Hệ điều hành: Windows 10
            -   Địa chỉ IP: 
    -   Router1:
        -   Thông tin về Router1:
            -   Địa chỉ IP:
            -   ...
    -   Server Ubuntu:
        -   Thông tin về Server Ubuntu:
            -   Đia chỉ IP:
            -   CPU: Intel Core i5-8250U
            -   RAM: 8GB
            -   Ổ cứng: 256GB SSD
            -   Hệ điều hành: Ubuntu 18.04
-   Triển khai cấu hình hệ thống giám sát:
    -   Cấu hình Zabbix Server trên Server Ubuntu
    -   Cấu hình SNMP Agent trên PC1
    -   Cấu hình SNMP agent trên Router1
    -   Cấu hình Web Interface trên PC1, kết nối đến Zabbix Server
    -   Cấu hình Web Interface để giám sát Router1
        -   Tạo host Router1
        -   Tạo các item để giám sát Router1
    -   Cấu hình Web Interface để giám sát PC1
        -   Tạo host PC1
        -   Tạo các item để giám sát PC1
-   Triển khai giám sát thông qua Web Interface
    -   Giám sát PC1:
        -   Giám sát dung lượng RAM
        -   Giám sát thời gian hoạt động của máy
        -   ...
    -   Giám sát Router1:
        -   Giám sát thông tin về các interface
        -   Giám sát thông tin về các route
        -   ...
# Chương 4: Kết luận
-   Tổng kết
-   Hạn chế
-   Hướng phát triển
# Chương 5: Tài liệu tham khảo