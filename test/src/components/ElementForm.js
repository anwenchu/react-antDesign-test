import { Form, Input, Tooltip, Icon, Cascader, Select, Row, Col, Checkbox, Button, AutoComplete } from 'antd';
/*
*新建元素页面表单
*/



const FormItem = Form.Item;
const Option = Select.Option;
const AutoCompleteOption = AutoComplete.Option;
const { TextArea } = Input;


class ElementFormInfo extends React.Component {
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
        <FormItem
          {...formItemLayout}
          label="元素名称"
        >
          {getFieldDecorator('title', {
            rules: [{
              required: true, message: '请输入元素名称!',
            }],
          })(
            <Input placeholder="请输入元素名称"/>
          )}
        </FormItem>

        <FormItem
          {...formItemLayout}
          label="元素类型"
        >
          <Input placeholder="请输入元素类型"/>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="元素id"
        >
          <Input placeholder="请输入元素id"/>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="元素文本"
        >
          <Input placeholder="请输入元素文本"/>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="元素坐标"
        >
          <Input placeholder="请输入元素坐标"/>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="元素xpath"
        >
          <Input placeholder="请输入元素xpath"/>
        </FormItem>
        <FormItem
          {...formItemLayout}
          label="描述"
        >
          <TextArea placeholder="请输入元素描述" autosize={{ minRows: 2, maxRows: 6 }} />
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



const ElementForm = () => {
  const WrappedElementForm = Form.create()(ElementFormInfo);
  return (
    <WrappedElementForm />
  );
};

ElementForm.propTypes = {
};

export default ElementForm;