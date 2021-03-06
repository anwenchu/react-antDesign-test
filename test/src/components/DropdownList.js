import { Table, Icon, Divider,Menu, Dropdown, Button, message } from 'antd';

function handleButtonClick(e) {
  message.info('Click on left button.');
  console.log('click left button', e);
}

function handleMenuClick(e) {
  message.info('Click on menu item.');
  console.log('click', e);
}

const statusMenu = (
  <Menu onClick={handleMenuClick}>
    <Menu.Item key="1">通过</Menu.Item>
    <Menu.Item key="2">失败</Menu.Item>
  </Menu>
);

const DropdownList = ({ onDelete, products }) => {
  return (
    <Dropdown overlay={statusMenu}>
      <Button style={{ marginLeft: 8 }}>
        请选择 <Icon type="down" />
      </Button>
    </Dropdown>
  );
};


DropdownList.propTypes = {
};

export default DropdownList;