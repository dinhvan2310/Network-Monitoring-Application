-   vào chế độ cấu hình
-   enable
-   configure terminal 


#   Cấu hình SNMPv1 và SNMPv2c 
-   Cần community string là kết nối được với zabbix rồi
##  Cấu hình community string
-   snmp-server community {community-string} [view view-name] [ro | rw] [access-list-number]
    -   community string được sử dụng trong SNMPv1 và SNMPv2c.
     -  community-string: là chuỗi ký tự dùng để xác thực cho các thiết bị SNMP client. Chuỗi ký tự này phải giống nhau giữa SNMP client và SNMP server. Community string có thể là bất kỳ chuỗi ký tự nào, nhưng nên sử dụng chuỗi ký tự có độ dài từ 8 đến 20 ký tự, bao gồm cả chữ và số.
     -  [view-name] (ngoặc vuông như ri là biết thêm thôi á, tại cũng không xài): là tên của một SNMP view. Một SNMP view xác định các đối tượng SNMP mà một SNMP client có thể truy cập. Một SNMP view cũng xác định các hoạt động mà một SNMP client có thể thực hiện trên các đối tượng SNMP. Nếu không xác định view-name, community string sẽ được áp dụng cho tất cả các đối tượng SNMP. (nghĩa là hén sẽ giới hạn quyền truy cập của community string đó, nếu không xác định view-name thì sẽ cho phép truy cập tất cả các đối tượng SNMP, các đối tượng SNMP ví dụ như là systemName: .1.3.6.1.2.1.1.5.0)
        -  cấu hình view-name (tạo xong view thì mới có mà xài lúc tạo community string nè):
            -   snmp-server view {view-name} {oid-tree} [included | excluded]
            -   view-name: là tên của một SNMP view (đặt bất kì nè)
            -   oid-tree: là một OID (Object Identifier) hoặc một OID tree (cây OID). Một OID tree là một nhánh của cây OID. Một OID tree bao gồm một OID và tất cả các OID con của nó. Một OID tree được sử dụng để xác định các đối tượng SNMP mà một SNMP client có thể truy cập. vd: 1.3.6.1.2.1.2
            -   included | excluded: xác định các đối tượng SNMP được bao gồm hoặc bị loại trừ khỏi SNMP view. Nếu không xác định included hoặc excluded, mặc định là included.
            -   Ví dụ, để tạo một view SNMP có tên "view1" và bao gồm cây MIB có địa chỉ OID "1.3.6.1.2.1.1" và "1.3.6.1.2.1.2", bạn có thể sử dụng lệnh sau:
            -   snmp-server view view1 1.3.6.1.2.1.1 included
            -   snmp-server view view1 1.3.6.1.2.1.2 included
            - thì nghĩa là community string đó chỉ có thể truy cập được các đối tượng SNMP có địa chỉ OID có dạng 1.3.6.1.2.1.1.x.y.z và 1.3.6.1.2.1.2.x.y.z

    -  ro: chỉ cho phép SNMP client đọc thông tin từ các đối tượng SNMP.
    -  rw: cho phép SNMP client đọc và ghi thông tin từ các đối tượng SNMP.
    -  [access-list-number]: là số của một access list (ACL). ACL được sử dụng để kiểm soát quyền truy cập của SNMP client đến các đối tượng SNMP. Nếu không xác định access-list-number, tất cả các SNMP client sẽ được cho phép truy cập.
-   vd: snmp-server community public rw

#  Cấu hình SNMPv3 
-   Để cấu hình SNMPv3, mình phải cấu hình một SNMP group và một SNMP user. Một SNMP group xác định các người dùng SNMP thuộc nhóm đó. Một SNMP user xác định các thông tin xác thực và quyền truy cập của một người dùng SNMP. Một SNMP user phải thuộc một SNMP group. Một SNMP group có thể có nhiều SNMP user.
-   Cần tên user (username) là kết nối được với zabbix rồi, ngoài có thể cần thêm password, priviledge, auth-protocol, priv-protocol nữa tuỳ vào loại xác thực và mã hóa mà mình chọn.

##   Cấu hình SNMP group
-   snmp-server group {group-name} {v1 | v2c | v3} {auth | noauth | priv} [read read-view] [write write-view] [notify notify-view] [access access-list-number]
    -   group-name: là tên của một SNMP group (tự đặt nè). Một SNMP group được sử dụng để quản lý quyền truy cập vào thông tin mạng. Một SNMP group bao gồm một hoặc nhiều SNMP user và xác định quyền truy cập của chúng đến các đối tượng SNMP.
    -   v1 | v2c | v3: xác định phiên bản của SNMP. Nếu không xác định phiên bản, mặc định là SNMPv1.
    -   auth | noauth | priv: xác định loại xác thực và mã hóa được sử dụng trong SNMPv3.
        -   chọn mấy cái này ảnh hưởng đến lúc tạo user đoạn sau nè
        -   auth: xác thực thông tin SNMP bằng cách sử dụng MD5 hoặc SHA. (nghĩa là xác thực thông tin SNMP, nên phải xác định password cho user, nên không cần phải xác định priviledge cho user)
        -   noauth: không xác thực thông tin SNMP. (nghĩa là không xác thực thông tin SNMP, nên không cần phải xác định password cho user, nên không cần phải xác định priviledge cho user)
        -   priv: (auth + priv) xác thực và mã hóa thông tin SNMP bằng cách sử dụng DES hoặc AES. (nghĩa là xác thực và mã hóa thông tin SNMP, nên phải xác định password cho user, nên phải xác định priviledge cho user)

        -   Nếu không xác định auth, noauth hoặc priv, mặc định là noauth.
        -   auth (xác thực) sử dụng các thuật toán như MD5 hoặc SHA để xác minh tính hợp lệ của thông điệp SNMP. Nó đảm bảo rằng thông điệp không bị thay đổi trái phép trong quá trình truyền tải. Nhưng nó không đảm bảo tính bảo mật của thông điệp SNMP. Lựa chọn auth giúp đảm bảo tính toàn vẹn của thông điệp SNMP.
        -   priv (mã hóa) sử dụng các thuật toán như DES hoặc AES để mã hóa thông điệp SNMP. Nó đảm bảo rằng thông điệp không bị đọc trái phép trong quá trình truyền tải (mã hoá rồi nên người ta có bắt lấy gói tin cũng không đọc được). Lựa chọn priv giúp đảm bảo tính bảo mật của thông điệp SNMP.

    -   [read-view]: là tên của một SNMP view. Một SNMP view xác định các đối tượng SNMP mà một SNMP user có thể truy cập. Một SNMP view cũng xác định các hoạt động mà một SNMP user có thể thực hiện trên các đối tượng SNMP. Nếu không xác định read-view, tất cả các đối tượng SNMP sẽ được cho phép đọc (giống như view allview trong SNMPv1 và SNMPv2c phía trên)
    -   [write-view]: là tên của một SNMP view. Một SNMP view xác định các đối tượng SNMP mà một SNMP user có thể truy cập. Một SNMP view cũng xác định các hoạt động mà một SNMP user có thể thực hiện trên các đối tượng SNMP. Nếu không xác định write-view, tất cả các đối tượng SNMP sẽ được cho phép ghi.
    -   [notify-view]: là tên của một SNMP view. Một SNMP view xác định các đối tượng SNMP mà một SNMP user có thể truy cập. Một SNMP view cũng xác định các hoạt động mà một SNMP user có thể thực hiện trên các đối tượng SNMP. Nếu không xác định notify-view, tất cả các đối tượng SNMP sẽ được cho phép thông báo.
    -   [access-list-number]: là số của một access list (ACL). ACL được sử dụng để kiểm soát quyền truy cập của SNMP user đến các đối tượng SNMP. Nếu không xác định access-list-number, tất cả các SNMP user sẽ được cho phép truy cập.
    -   vd: snmp-server group group1 v3 priv

##   cấu hình SNMP user
-   snmp-server user {username} {groupname} v3 [auth {auth-protocol} {auth-password}] [priv {priv-protocol} {priv-password}]
    -   user-name: là tên của một SNMP user (tự đặt nè). Một SNMP user xác định các thông tin xác thực và quyền truy cập của một người dùng SNMP. Một SNMP user phải thuộc một SNMP group. Một SNMP group có thể có nhiều SNMP user.
    -   group-name: là tên của một SNMP group (tự đặt nè, đùa thôi, phải trùng với tên group đã tạo trước đó).
    -   v3: xác định phiên bản của SNMP.
    -   [auth {auth-protocol} {auth-password}] [priv {priv-protocol} {priv-password}]
        -   Nếu group chọn auth, thì auth-password hoặc auth-protocol phải được xác định.
        -   Nếu group chọn priv, thì auth-password, auth-protocol, priv-password hoặc priv-protocol phải được xác định.
        -   Nếu group chọn noauth, thì không cần phải xác định auth-password, auth-protocol, priv-password hoặc priv-protocol.
        
    -   [auth-protocol]: xác định loại xác thực được sử dụng trong SNMPv3. auth-protocol có thể là MD5 hoặc SHA. Nếu không xác định auth-protocol, mặc định là MD5.
    -   [auth-password]: là một chuỗi ký tự dùng để xác thực cho một SNMP user. Chuỗi ký tự này phải giống nhau giữa SNMP client và SNMP server (dùng cái password ni trong lúc tạo host trên zabbix á) 
    -   [priv-protocol]: xác định loại mã hóa được sử dụng trong SNMPv3. priv-protocol có thể là DES hoặc AES. Nếu không xác định priv-protocol, mặc định là DES.
    -   [priv-password]: là một chuỗi ký tự dùng để mã hóa cho một SNMP user. Chuỗi ký tự này phải giống nhau giữa SNMP client và SNMP server (dùng cái password ni trong lúc tạo host trên zabbix á)

    - vd: snmp-server user user1 group1 v3 auth md5 user1pass priv des56 user1pass