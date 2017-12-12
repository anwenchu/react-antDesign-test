import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
import TestPlaneCaseList from './TestPlaneCaseList';
/*
*新建测试计划页面表单
*/



const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const { TextArea } = Input;
/*
*新建测试计划页面（TestPlane），测试计划表单
* 数据：来自testPlane表
*/
const residences = [{
  value: '冒烟基本功能用例',
  label: '冒烟基本功能用例',
  children: [{
    value: '首页',
    label: '首页',
    children: [{
      value: '附近的人',
      label: '附近的人',
    }],
  }],
}, {
  value: '公共用例',
  label: '公共用例',
  children: [{
    value: '注册登录',
    label: '注册登录',
  }],
}];

class TestPlaneFormInfo extends React.Component {
  state = {
    confirmDirty: false,
    autoCompleteResult: [],
  };
  handleSubmit = (e) => {
    e.preventDefault();
    this.props.form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        console.log('Received values of form: ', values);
      }
    });
  }


  handleWebsiteChange = (value) => {
    let autoCompleteResult;
    if (!value) {
      autoCompleteResult = [];
    } else {
      autoCompleteResult = ['.com', '.org', '.net'].map(domain => `${value}${domain}`);
    }
    this.setState({ autoCompleteResult });
  }

  render() {
    const { getFieldDecorator } = this.props.form;
    const { autoCompleteResult } = this.state;

    const formItemLayout = {
      labelCol: {
        xs: { span: 24 },
        sm: { span: 8 },
      },
      wrapperCol: {
        xs: { span: 24 },
        sm: { span: 16 },
      },
    };
    const tailFormItemLayout = {
      wrapperCol: {
        xs: {
          span: 24,
          offset: 0,
        },
        sm: {
          span: 16,
          offset: 8,
        },
      },
    };

    const websiteOptions = autoCompleteResult.map(website => (
      <AutoCompleteOption key={website}>{website}</AutoCompleteOption>
    ));

    return (
      <Form onSubmit={this.handleSubmit}>
      	<div>测试计划</div>
        <FormItem
          {...formItemLayout}
          label="标题"
        >
          {getFieldDecorator('title', {
            rules: [{
              type: 'title', message: '输入的标题不合法!',
            }, {
              required: true, message: '请输入标题!',
            }],
          })(
            <Input placeholder="请输入标题"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="描述"
        >
          <TextArea placeholder="请输入描述" autosize={{ minRows: 2, maxRows: 6 }} />
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="执行次数"
        >
          <Input placeholder="请输入执行次数"/>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="app地址"
        >
          {getFieldDecorator('title', {
            rules: [{
              type: 'title', message: '输入的app地址不合法!',
            }, {
              required: true, message: '请输入app地址!',
            }],
          })(
            <Input placeholder="请输入app地址"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="客户端版本号"
        >
          {getFieldDecorator('title', {
            rules: [{
              required: true, message: '请输入客户端版本号!',
            }],
          })(
            <Input placeholder="请输入app地址"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="系统版本"
        >
          {getFieldDecorator('title', {
            rules: [{
              required: true, message: '请输入系统版本!',
            }],
          })(
            <Input placeholder="请输入系统版本"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="设备名称"
        >
          {getFieldDecorator('title', {
            rules: [{
              required: true, message: '请输入设备名称!',
            }],
          })(
            <Input placeholder="请输入设备名称"/>
          )}
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="uuis（ios）"
        >
          <Input placeholder="请输入uuid"/>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="选择用例目录"
        >
          {getFieldDecorator('residence', {
            rules: [{ type: 'array', required: true, message: '请选择用例组目录!' }],
          })(
            <Cascader placeholder="请选择" options={residences} />
          )}
        </FormItem>
        <FormItem>
          <TestPlaneCaseList />
        </FormItem>
        <FormItem>
          <Row gutter={16} align={"middle"} justify={"center"}>
            <Col className="gutter-row" span={2}>
            <Button type="primary">保存</Button>
            </Col>
            <Col className="gutter-row" span={4}>
              <Button >取消</Button>
            </Col>
          </Row>
        </FormItem>
      </Form>
    );
  }
}



const TestPlaneForm = () => {
  const WrappedTestPlaneForm = Form.create()(TestPlaneFormInfo);
  return (
    <WrappedTestPlaneForm />
  );
};

TestPlaneForm.propTypes = {
};

export default TestPlaneForm;
