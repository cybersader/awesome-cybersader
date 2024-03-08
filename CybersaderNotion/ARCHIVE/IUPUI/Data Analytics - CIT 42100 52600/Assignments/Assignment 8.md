# Assignment 8

> *Name: Benjamin Rader*
> 

# Questions

## Question 1

<aside>
⭐ Create a table called ‘employee’ with a column family name ‘personaldata’

</aside>

- Start - `hbase shell`
    
    ![Untitled](Assignment%208/Untitled.png)
    
- `create ‘employee’, ‘personaldata’`
    
    ![Untitled](Assignment%208/Untitled%201.png)
    

## Question 2

<aside>
⭐ Check whether the table is created or not

</aside>

- `exists ‘employee’` or `list`
    
    ![Untitled](Assignment%208/Untitled%202.png)
    

## Question 3

<aside>
⭐ Insert some data in our table.

Employee 1: id: E0001, name: Alex

Employee 2: id: E0002, name: Nancy, age: 37

Employee 3: id: E0003, name: Bob,   city: New York

</aside>

- 3 Rows to enter:
    - 1
        - `put ‘employee’,’1’,’personaldata:id’,’E0001’`
            
            ![Untitled](Assignment%208/Untitled%203.png)
            
        - `put 'employee','1',’personaldata:name’,’Alex’`
            
            ![Untitled](Assignment%208/Untitled%204.png)
            
    - 2
        - `put ‘employee’,’2’,’personaldata:id’,’E0002’`
        - `put ‘employee’,’2’,’personaldata:name’,’Nancy’`
        - `put ‘employee’,’2’,'personaldata:age’,’37’`
            
            ![Untitled](Assignment%208/Untitled%205.png)
            
    - 3
        - `put ‘employee’,’3’,’personaldata:id’,’E0003’`
            
            ![Untitled](Assignment%208/Untitled%206.png)
            
        - `put ‘employee’,’3’,’personaldata:name’,’Bob’`
            
            ![Untitled](Assignment%208/Untitled%207.png)
            
        - `put ‘employee’,’3’,'personaldata:city’,’New York’`
            
            ![Untitled](Assignment%208/Untitled%208.png)
            
- `scan ‘employee’`
    
    ![Untitled](Assignment%208/Untitled%209.png)
    

## Question 4

<aside>
⭐ Add age 30 to Alex.

</aside>

- `put ‘employee’,’1’,’personaldata:age’,’30’`
    
    ![Untitled](Assignment%208/Untitled%2010.png)
    

## Question 5

<aside>
⭐ Update the age in E0002 to 38

</aside>

- `put ‘employee’,’2’,’personaldata:age’,’38’`
    
    ![Untitled](Assignment%208/Untitled%2011.png)
    

## Question 6

<aside>
⭐ Remove E0003

</aside>

- `deleteall ‘employee’,’3’`
    
    ![Untitled](Assignment%208/Untitled%2012.png)
    
- `get ‘employee’,’3’`
    
    ![Untitled](Assignment%208/Untitled%2013.png)