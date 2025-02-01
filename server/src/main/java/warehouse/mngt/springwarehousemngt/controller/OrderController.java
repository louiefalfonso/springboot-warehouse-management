package warehouse.mngt.springwarehousemngt.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import warehouse.mngt.springwarehousemngt.dto.OrderDto;
import warehouse.mngt.springwarehousemngt.entity.Order;
import warehouse.mngt.springwarehousemngt.repository.OrderRepository;
import warehouse.mngt.springwarehousemngt.service.OrderService;

import java.util.List;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/orders")
public class OrderController {

    private OrderRepository orderRepository;
    private OrderService orderService;

    //POST - Create New Order REST API
    @PostMapping
    public ResponseEntity<OrderDto> createNewOrder(@RequestBody OrderDto orderDto){
        OrderDto savedOrder = orderService.createNewOrder(orderDto);
        return new ResponseEntity<>(savedOrder, HttpStatus.CREATED);
    }

    //GET - Get Order By ID REST API
    @GetMapping("{id}")
    public ResponseEntity<Order> getOrderById(@PathVariable ("id") Long id){
        Order order =  orderRepository.findAllById(id)
                .orElseThrow(()-> new RuntimeException("Order does not exist with Id:" + id));
        return ResponseEntity.ok(order);
    }

    //GET - Get All Orders REST API
    @GetMapping
    public ResponseEntity<List<OrderDto>> getAllOrders(){
        List<OrderDto> orders = orderService.getAllOrders();
        return ResponseEntity.ok(orders);
    }

}
