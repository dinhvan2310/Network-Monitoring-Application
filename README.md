-   show ip int brief

-   tao một group
-   setting group security level
-   tạo một user trong group, và set password cho user, và set priviledge cho user

snmp-server group group1 v3 priv
snmp-server user user1 group1 v3 auth md5 user1pass priv des56 user1pass
snmp-server user user2 group1 v3 auth md5 user2pass priv des56 user2pass
noauthnopriv: snmp-server user user1 group1 v3 auth md5 user1pass



-   Trong SNMP (Simple Network Management Protocol), một SNMP group (nhóm SNMP) được sử dụng để quản lý quyền truy cập vào thông tin mạng. Một SNMP group bao gồm một hoặc nhiều SNMP user (người dùng SNMP) và xác định quyền truy cập của chúng đến các đối tượng SNMP.

-   Các quyền truy cập của một SNMP group được xác định bởi một SNMP view (xem SNMP). Một SNMP view xác định các đối tượng SNMP mà một SNMP user có thể truy cập. Một SNMP view cũng xác định các hoạt động mà một SNMP user có thể thực hiện trên các đối tượng SNMP.

-   Các hành động bạn có thể thực hiện với SNMP group bao gồm:

Tạo SNMP group: Bạn có thể tạo một SNMP group để nhóm các người dùng SNMP lại với nhau. Điều này giúp quản lý và áp dụng các quyền truy cập chung cho một nhóm người dùng cụ thể.

Cấu hình quyền truy cập: Bạn có thể đặt quyền truy cập cho SNMP group. Ví dụ, bạn có thể cho phép nhóm này chỉ đọc thông tin (read-only access) hoặc cho phép cả đọc và ghi (read-write access) đối với các đối tượng SNMP cụ thể.

Áp dụng ACL (Access Control List): Bạn có thể áp dụng ACL để kiểm soát quyền truy cập của SNMP group đến các đối tượng SNMP cụ thể. ACL cho phép bạn xác định các điều kiện và hành động để kiểm soát quyền truy cập.

Quản lý SNMP users: SNMP group định nghĩa các người dùng SNMP thuộc nhóm đó. Bằng cách quản lý SNMP group, bạn có thể thêm hoặc xóa người dùng SNMP khỏi nhóm, cung cấp quyền truy cập và quản lý các thông tin xác thực.

Tổ chức SNMP group giúp tạo sự cấu trúc và quản lý dễ dàng hơn cho việc quản lý mạng thông qua SNMP. Nó cho phép bạn xác định quyền truy cập của các người dùng và áp dụng các quy tắc bảo mật cho các đối tượng SNMP cụ thể.



2.3.	Phân tích kiến trúc hệ thống:
Cơ chế thu thập, xử lý và lưu trữ dữ liệu trong hệ thống có thể hoạt động như sau: 
-	Thu thập dữ liệu: SNMP Agent sẽ thu thập dữ liệu từ host cần giám sát theo các thiết lập cấu hình. Dữ liệu này bao gồm thông tin về tình trạng hoạt động, tài nguyên sử dụng, băng thông và các chỉ số khác liên quan đến mạng. 
-	Truyền thông tin: Dữ liệu thu thập từ SNMP Agent sẽ được gửi đến máy chủ Zabbix thông qua giao thức truyền thông như TCP/IP hoặc HTTP. 
-	Xử lý dữ liệu: Máy chủ nhận dữ liệu từ SNMP Agent và tiến hành xử lý. Quá trình này bao gồm lưu trữ dữ liệu vào cơ sở dữ liệu, so sánh dữ liệu với các ngưỡng cảnh báo được định trước, và tạo ra cảnh báo nếu cần. Máy chủ Zabbix cũng thực hiện các phân tích dữ liệu để tạo ra báo cáo và biểu đồ cho người dùng.
-	Lưu trữ dữ liệu: Dữ liệu giám sát được máy chủ Zabbix lưu trữ trong cơ sở dữ liệu của Zabbix. Cơ sở dữ liệu này có thể là MySQL, PostgreSQL, Oracle hoặc SQLite. 

2.4. Phân tích giao diện người dùng:
Giao diện người dùng của Zabbix có thể được truy cập thông qua trình duyệt web. Giao diện người dùng cung cấp các chức năng sau:
- Trang chủ (Dashboard): Hiển thị tổng quan về trạng thái của các host đang được giám sát. Biểu đồ và số liệu thống kê về tình trạng mạng tổng thể. Liệt kê các cảnh báo quan trọng nhất và thông báo tình trạng.
- Giám sát (Monitoring): Hiển thị các thông tin chi tiết về tình trạng của các host đang được giám sát. Các thông tin này bao gồm các chỉ số về tình trạng hoạt động, tài nguyên sử dụng, băng thông và các chỉ số khác liên quan đến mạng.
- Thu thập dữ liệu (Data Collection): Giao diện để cấu hình các item và các thông số giám sát cho host.
Cung cấp các biểu mẫu và ô nhập để định nghĩa các thông số cấu hình, như loại giám sát, ngưỡng cảnh báo, khoảng thời gian giám sát, các tham số khác.
Khả năng áp dụng các thiết lập giám sát cho một hoặc nhiều host cùng lúc.
- Quản lý người dùng (User Management): Giao diện để quản lý người dùng và các nhóm người dùng. Cung cấp các chức năng như tạo, xóa, sửa đổi thông tin người dùng, phân quyền người dùng, quản lý các nhóm người dùng.

2.5. Phân tích cơ chế hoạt động:
Cơ chế hoạt động của Zabbix có thể được mô tả như sau:
-	Thu thập dữ liệu: Zabbix Agent sẽ thu thập dữ liệu từ host cần giám sát theo các thiết lập cấu hình. Dữ liệu này bao gồm thông tin về tình trạng hoạt động, tài nguyên sử dụng, băng thông và các chỉ số khác liên quan đến mạng.
-	Truyền thông tin: Dữ liệu thu thập từ Zabbix Agent sẽ được gửi đến máy chủ Zabbix thông qua giao thức truyền thông như TCP/IP hoặc HTTP.
-	Xử lý dữ liệu: Máy chủ nhận dữ liệu từ Zabbix Agent và tiến hành xử lý. Quá trình này bao gồm lưu trữ dữ liệu vào cơ sở dữ liệu, so sánh dữ liệu với các ngưỡng cảnh báo được định trước, và tạo ra cảnh báo nếu cần. Máy chủ Zabbix cũng thực hiện các phân tích dữ liệu để tạo ra báo cáo và biểu đồ cho người dùng.
-	Lưu trữ dữ liệu: Dữ liệu giám sát được máy chủ Zabbix lưu trữ trong cơ sở dữ liệu của Zabbix. Cơ sở dữ liệu này có thể là MySQL, PostgreSQL, Oracle hoặc SQLite.
-   Các thành phần của Zabbix:
-   Zabbix Agent: Là một phần mềm được cài đặt trên host cần giám sát. Zabbix Agent sẽ thu thập dữ liệu từ host và gửi đến máy chủ Zabbix. Zabbix Agent có thể được cài đặt trên các hệ điều hành khác nhau như Linux, Windows, Solaris, HP-UX, AIX, FreeBSD, OpenBSD, OS X, Tru64/OSF1, NetBSD, OpenBSD, OS X, QNX, AIX, FreeBSD, OpenBSD, OS X, Tru64/OSF1, NetBSD, OpenBSD, OS X, QNX, AIX, FreeBSD, OpenBSD, OS X, Tru64/OSF1, NetBSD, OpenBSD, OS X, QNX, AIX, FreeBSD, OpenBSD, OS X, Tru64/OSF1, NetBSD, OpenBSD, OS X, QNX, AIX, FreeBSD, OpenBSD, OS X, Tru64/OSF1, NetBSD, OpenBSD, OS X, QNX, AIX, FreeBSD, OpenBSD, OS X, Tru64/OSF1, NetBSD, OpenBSD, OS X, QNX, AIX, FreeBSD, OpenBSD, OS X, Tru64/OSF1, NetBSD, OpenBSD, OS X, QNX, AIX, FreeBSD
-   Zabbix Server: Là một phần mềm được cài đặt trên máy chủ Zabbix. Zabbix Server nhận dữ liệu từ Zabbix Agent và tiến hành xử lý. Quá trình này bao gồm lưu trữ dữ liệu vào cơ sở dữ liệu, so sánh dữ liệu với các ngưỡng cảnh báo được định trước, và tạo ra cảnh báo nếu cần. Máy chủ Zabbix cũng thực hiện các phân tích dữ liệu để tạo ra báo cáo và biểu đồ cho người dùng.
-   Cơ sở dữ liệu: Dữ liệu giám sát được máy chủ Zabbix lưu trữ trong cơ sở dữ liệu của Zabbix. Cơ sở dữ liệu này có thể là MySQL, PostgreSQL, Oracle hoặc SQLite.
-   Giao diện người dùng: Giao diện người dùng của Zabbix có thể được truy cập thông qua trình duyệt web. Giao diện người dùng cung cấp các chức năng như quản lý người dùng, cấu hình giám sát, xem báo cáo và biểu đồ, xem cảnh báo, và các chức năng khác.


