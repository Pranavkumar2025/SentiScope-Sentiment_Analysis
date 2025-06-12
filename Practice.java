class Demo {
    int x;
    int y;
    Demo(int a, int b){
        x = a;  
        y = b;
    }
    void show(){
        System.out.println(x+ " " + y);
        // System.out.println(x);
    }
}

class Practice{
    public static void main(String[] args){
        Demo myDemo  = new Demo(85,23);
        myDemo.show();
    }
}