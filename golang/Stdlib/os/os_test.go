package os_test

import (
	"os"
	"testing"
	"io"
)

// 创建文件
func TestCreate(t *testing.T){
	f, err := os.Create("ostest.txt")
	if err != nil {
		panic(err)
	}
	defer f.Close()
}

// 创建目录函数
func TestMkdir(t *testing.T){
	err := os.Mkdir("hello",os.ModePerm)
	if err != nil {
		panic(err)
	}
}

// 创建多级目录
func TestMkdieAll(t *testing.T){
	err := os.MkdirAll("hello/world/a",os.ModePerm)
	if err != nil {
		panic(err)
	}
}

// 删除单个目录或者文件
func TestRemove(t *testing.T){
	err := os.Remove("hello/world/a")
	if err != nil {
		panic(err)
	}
}

// 强制删除目录以及目录下的文件
func TestRemoveAll(t *testing.T){
	err := os.RemoveAll("hello")
	if err != nil {
		panic(err)
	}
}

// 获取工作目录
func TestGetwd(t *testing.T){
	dir, err := os.Getwd()
	if err != nil {
		fmt.Printf("err: %v \n", err)
	}else{
		fmt.Printf("dir: %v \n", dir)
	}
}

// 修改工作目录
func TestChdir(t *testing.T){
	err := os.Chdir("d:hello/world/project")
	if err != nil {
		fmt.Printf("err: %v\n", err)
	}
	fmt.Println(os.Getwd())
}

// 创建临时目录
func TestTempDir(t *testing.T){
	dir := os.TempDir()
	fmt.Printf("s: %v\n", s)
}

// 重命名文件
func TestRename(t *testing.T){
	err := os.Rename("test.txt","test1.txt")
	if err != nil {
		fmt.Printf("err: %v\n", err)
	}
}

// 修改权限
func TestChmod(t *testing.T){
	err := os.Chmod("test.txt", 0111)
	if err != nil {
		fmt.Printf("err: %v\n", err)
	}
}

// 修改文件所有者
func TestChown(t *testing.T){
	uid , gid := 1, 2
	err := os.Chown("test.txt", uid, gid)
	if err != nil {
		fmt.Printf("err: %v\n",err)
	}
}

// 获取文件信息
func TestStat(t *testing.T){
	f , err := os.OpenFile("test1.txt", os.O_RDWR|os.O_CREATE, 0755)
	if err != nil {
		fmt.Printf("err: %v\n", err)
	}
	defer f.Close()
	fileInfo , err := f.Stat()
	if err != nil {
		fmt.Printf("file information: %v\n",fileInfo )
	}
}

// 读取文件内容
func TestRead(t *testing.T){
	f , err := os.Openfile("test1.txt", os.O_CREATE|os.O_RDWR, 0755)
	if err != nil {
		fmt.Printf("err: %v\n",err)
	}
	defer f.Close()
	var content []byte
	for {
		buf := make([]byte, 4)
		n , err := f.Read(buf)
		content = append(content, buf[:n]...)
		if err == io.EOF {
			break
		}
	}
	fmt.Println("result content: ",content)
}

// 从某个位置读取数据
func TestReadAt(t *testing.T){
	f , err := os.Openfile("test1.txt", os.O_CREATE|os.O_RDWR, 0755)
	if err != nil {
		fmt.Printf("err: %v\n",err)
	}
	defer f.Close()
	buf := make([]byte, 5)
	n , err := f.ReadAt(buf,6)
	if err != nil {
		panic(err)
	}
	fmt.Println("result content: ",buf)
}

// 读取目录
func TestReadDir(t *testing.T){
	f , err := os.Open("os")
	if err != nil {
		fmt.Printf("err: %v\n",err)
	}
	defer f.Close()
	dirs , err := f.ReadDir(-1)
	if err != nil {
		panic(err)
	}
	for _, v := range dirs {
		fmt.Println(v.Name,": ",v.IsDir())
	}
}

// 文件偏移
func TestSeek(t *testing.T){
	f , err := os.Openfile("test1.txt", os.O_CREATE|os.O_RDWR, 0755)
	if err != nil {
		fmt.Printf("err: %v\n",err)
	}
	defer f.Close()
	f.Seek(3, 0) // offset & whence
	buf := make([]byte, 10)
	n , err := f.Read(buf)
	if err != nil {
		panic(err)
	}
	fmt.Println("read result: ",buf)
}

// 文件写入
func TestWrite(t *testing.T){
	f , err := os.Openfile("test1.txt", os.O_CREATE|os.O_RDWR|os.O_APPEND, 0755)
	if err != nil {
		panic(err)
	}
	defer f.Close()
	f.Write([]byte("参数是字节数组！\n"))
	f.WriteString("参数是字符串！\n")
}

// 文件内容替换
func TestWriteAt(t *testing.T){
	f , err := os.Openfile("test1.txt", os.O_CREATE|os.O_RDWR, 0755)
	if err != nil {
		panic(err)
	}
	defer f.Close()
	f.WriteAt([]byte("替换文字\n"), 5)// 从下标为5的元素开始替换
}