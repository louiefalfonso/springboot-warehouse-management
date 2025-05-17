package warehouse.mngt.springwarehousemngt.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import warehouse.mngt.springwarehousemngt.dto.CategoryDto;
import warehouse.mngt.springwarehousemngt.repository.CategoryRepository;
import warehouse.mngt.springwarehousemngt.service.CategoryService;

@CrossOrigin("*")
@RestController
@AllArgsConstructor
@RequestMapping("/api/v1/categories")
public class CategoryController {

    private CategoryRepository categoryRepository;
    private CategoryService categoryService;

    //POST - Create New Category REST API
    @PostMapping
    public ResponseEntity<CategoryDto> createNewCategory(@RequestBody CategoryDto categoryDto){
        CategoryDto savedCategory = categoryService.createNewCategory(categoryDto);
        return new ResponseEntity<>(savedCategory, HttpStatus.CREATED);
    }
}

