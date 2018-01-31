package com.anwen.autotest.controller;

import com.alibaba.fastjson.JSONObject;
import com.alibaba.fastjson.serializer.SimplePropertyPreFilter;
import com.anwen.autotest.controller.tree.Dir;
import com.anwen.autotest.controller.tree.ITreeNode;
import com.anwen.autotest.controller.tree.Tree;
import com.anwen.autotest.controller.tree.TreeNode;
import com.anwen.autotest.domain.DirDomain;
import com.anwen.autotest.repository.DirRepository;
import io.swagger.annotations.Api;
import io.swagger.annotations.ApiOperation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by an_wch on 2017/12/13.
 */
@Api(description = "目录管理相关接口")
@RestController
@RequestMapping("/dir")
public class DirController extends AbstractController{

    @Autowired
    private DirRepository dirRepository;

    /**
     * 新增目录
     *
     * @param dir 需要新增的对象
     * @return 返回成功或失败
     */
    @ApiOperation(value = "新增目录", notes = "新增目录")
    @PostMapping(value = "/add")
    public ResponseEntity save(@RequestBody DirDomain dir) {
        dir.setIsDelete(0L);
        System.out.print(dir);
        return wrapperConsumer((p) -> dirRepository.save(p), dir);
    }

    /**
     * 删除目录
     * @param id 需要删除目录的id
     * @return
     */
    @ApiOperation(value = "删除目录", notes = "删除目录")
    @DeleteMapping("/{id}")
    public ResponseEntity delete(@PathVariable(value = "id") Long id) {
        return wrapperConsumer((p) -> dirRepository.delete(p), id);
    }

    /**
     * 修改元素
     *
     * @param dir 需要修改的目录
     * @return
     */
    @ApiOperation(value = "修改目录", notes = "修改目录")
    @PutMapping(value = "/update")
    public ResponseEntity update(@RequestBody DirDomain dir) {

        return wrapperConsumer((p) -> dirRepository.save(p), dir);
    }

    /**
     * 查询所有目录
     * @return
     */
    @ApiOperation(value = "查询所有目录", notes = "查询所有目录")
    @GetMapping(value = "/list")
    public ResponseEntity list(@RequestParam(value = "platform") String platform) {

        Long isDelete = 0L; // 0代表未删除，1代表删除
        List<DirDomain> resultList = dirRepository.findDirDomainByIsDeleteAndPlatform(isDelete,platform);

        //将DirDomain转为Dir对象
        List<ITreeNode> list = new ArrayList<ITreeNode>();
        for(int i=0; i<resultList.size();i++){
            //System.out.println(resultList.get(i));
            Dir org = new Dir(String .valueOf(resultList.get(i).getId()), resultList.get(i).getParentId(), resultList.get(i).getDirName());
            list.add(org);
        }
        Tree tree = new Tree(list);

        //如果是android平台，从根结点1开始描述树，如果是ios平台，从根结点11开始描述
        List<DirDomain> androidroot = dirRepository.findDirDomainByParentIdAndPlatform("0","android");
        List<DirDomain> iosroot = dirRepository.findDirDomainByParentIdAndPlatform("0","android");
        TreeNode treeNode;
        if (platform.equals("android"))
            treeNode = tree.getTreeNode(androidroot.get(0).getId().toString());
        else
            treeNode = tree.getTreeNode(iosroot.get(0).getId().toString());

        // 序列化
        SimplePropertyPreFilter filter = new SimplePropertyPreFilter(); // 构造方法里，也可以直接传需要序列化的属性名字
        filter.getExcludes().add("parent");
        filter.getExcludes().add("allChildren");
        String data = JSONObject.toJSONString(treeNode, filter);

        return wrapperSupplier(() -> data, false);

    }

    /**
     * 查询目录
     * @return
     */
    @ApiOperation(value = "查询目录", notes = "查询目录")
    @GetMapping(value = "/{id}")
    public ResponseEntity detail(@PathVariable(name = "id") Long id) {
        return wrapperSupplier(() -> dirRepository.findOne(id), false);
    }


    /**
     * 条件查询
     * @return
     */
    @ApiOperation(value = "条件查询", notes = "条件查询")
    @GetMapping(value = "/search")
    public ResponseEntity search(@RequestParam(value = "platform") String platform) {

        return null;
    }


}
