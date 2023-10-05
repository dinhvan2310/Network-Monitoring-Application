import { Space, Card } from "antd";
import classNames from 'classnames/bind';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

function AddSensor() {
  return (
    <Space size={"large"} wrap={true}>
      <Card title="SNMP Traffic" bordered={true} className={cx('card')}>
        <p className={cx('desc')}>Monitors bandwidth and traffic on servers, PCs, switches, etc. using SNMP</p>
        <i className={cx('subDesc')}>To query data from a probe device (localhost, 127.0.0.1, or ::1), add this device to PRTG with the IP address it has in your network and create the sensor on this device.</i>
      </Card>
      <Card title="SNMP APC Hardware" bordered={true} className={cx('card')}>
        <p className={cx('desc')}>Monitors performance counters on APC UPS hardware</p>
        <i className={cx('subDesc')}>You can use custom sensors to monitor additional counters and APC UPS without SNMP.</i>
      </Card>
      <Card title="SNMP Memory" bordered={true} className={cx('card')}>
        <p className={cx('desc')}>Monitors the memory usage of a system via SNMP</p>
        <i className={cx('subDesc')}>To query data from a probe device (localhost, 127.0.0.1, or ::1), add this device to PRTG with the IP address it has in your network and create the sensor on this device.</i>
      </Card>
      <Card title="SNMP Traffic" bordered={true} className={cx('card')}>
        <p className={cx('desc')}>Monitors bandwidth and traffic on servers, PCs, switches, etc. using SNMP</p>
        <i className={cx('subDesc')}>To query data from a probe device (localhost, 127.0.0.1, or ::1), add this device to PRTG with the IP address it has in your network and create the sensor on this device.</i>
      </Card>
      <Card title="SNMP APC Hardware" bordered={true} className={cx('card')}>
        <p className={cx('desc')}>Monitors performance counters on APC UPS hardware</p>
        <i className={cx('subDesc')}>You can use custom sensors to monitor additional counters and APC UPS without SNMP.</i>
      </Card>
      <Card title="SNMP Memory" bordered={true} className={cx('card')}>
        <p className={cx('desc')}>Monitors the memory usage of a system via SNMP</p>
        <i className={cx('subDesc')}>To query data from a probe device (localhost, 127.0.0.1, or ::1), add this device to PRTG with the IP address it has in your network and create the sensor on this device.</i>
      </Card>
      <Card title="SNMP Traffic" bordered={true} className={cx('card')}>
        <p className={cx('desc')}>Monitors bandwidth and traffic on servers, PCs, switches, etc. using SNMP</p>
        <i className={cx('subDesc')}>To query data from a probe device (localhost, 127.0.0.1, or ::1), add this device to PRTG with the IP address it has in your network and create the sensor on this device.</i>
      </Card>
      <Card title="SNMP APC Hardware" bordered={true} className={cx('card')}>
        <p className={cx('desc')}>Monitors performance counters on APC UPS hardware</p>
        <i className={cx('subDesc')}>You can use custom sensors to monitor additional counters and APC UPS without SNMP.</i>
      </Card>
      <Card title="SNMP Memory" bordered={true} className={cx('card')}>
        <p className={cx('desc')}>Monitors the memory usage of a system via SNMP</p>
        <i className={cx('subDesc')}>To query data from a probe device (localhost, 127.0.0.1, or ::1), add this device to PRTG with the IP address it has in your network and create the sensor on this device.</i>
      </Card>
      <Card title="SNMP Traffic" bordered={true} className={cx('card')}>
        <p className={cx('desc')}>Monitors bandwidth and traffic on servers, PCs, switches, etc. using SNMP</p>
        <i className={cx('subDesc')}>To query data from a probe device (localhost, 127.0.0.1, or ::1), add this device to PRTG with the IP address it has in your network and create the sensor on this device.</i>
      </Card>
      <Card title="SNMP APC Hardware" bordered={true} className={cx('card')}>
        <p className={cx('desc')}>Monitors performance counters on APC UPS hardware</p>
        <i className={cx('subDesc')}>You can use custom sensors to monitor additional counters and APC UPS without SNMP.</i>
      </Card>
      <Card title="SNMP Memory" bordered={true} className={cx('card')}>
        <p className={cx('desc')}>Monitors the memory usage of a system via SNMP</p>
        <i className={cx('subDesc')}>To query data from a probe device (localhost, 127.0.0.1, or ::1), add this device to PRTG with the IP address it has in your network and create the sensor on this device.</i>
      </Card>
      
    </Space>
  );
}

export default AddSensor;
