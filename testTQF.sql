/*create table batch(
	quantity int,
	batch_id int primary key
)*/

/*create table orders(
	order_number int primary key,
	quantity int
)*/

--alter table batch alter column batch_id type varchar(2);
--alter table orders alter column order_number type varchar(2);
--insert into batch values(12,'B2'),(8,'B3')
--insert into orders values('O1',2),('O2',8),('O3',2),('O4',5),('O5',9),('O6',5)
with recursive test_batch as (
	select batch_id, 1 as quantity from batch
	UNION ALL
	select test_batch.batch_id, test_batch.quantity + 1 from batch as b join test_batch
	on(b.batch_id = test_batch.batch_id) 
	where b.quantity > test_batch.quantity
), test_orders as(
	select order_number, 1 as quantity from orders
	UNION ALL 
	select test_orders.order_number,test_orders.quantity + 1 from orders as o 
	join test_orders on(o.order_number = test_orders.order_number)
	where o.quantity > test_orders.quantity
)
/*select batch_id,order_number,MAX(ord.quantity) from (select *,row_number() 
													 over(order by order_number,quantity)
		 from test_orders order by order_number) as ord,
(select * , row_number() over (order by batch_id)
		  from test_batch) as batch where batch.row_number = ord.row_number 
		  group by batch_id,order_number order by batch_id,order_number*/
		  
select * from test_orders, test_batch where test_orders.quantity = test_batch.quantity order by batch_id,order_number
