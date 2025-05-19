package warehouse.mngt.springwarehousemngt.controller;

import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import warehouse.mngt.springwarehousemngt.dto.CategoryDto;
import warehouse.mngt.springwarehousemngt.entity.Category;
import warehouse.mngt.springwarehousemngt.repository.CategoryRepository;
import warehouse.mngt.springwarehousemngt.service.CategoryService;

import java.util.List;

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

    //GET - Get Category By ID REST API
    @GetMapping("{id}")
    public  ResponseEntity<Category> getCategoryById(@PathVariable ("id") Long id){
        Category category = categoryRepository.findAllById(id)
                .orElseThrow(()->new RuntimeException("Category does not exist with Id:" + id));
        return ResponseEntity.ok(category);
    }

    //GET - Get All Categories REST API
    @GetMapping
    public ResponseEntity<List<CategoryDto>> getAllCategories(){
        List<CategoryDto> categories = categoryService.getAllCategories();
        return ResponseEntity.ok(categories);
    }

    // UPDATE - Update Category REST API
    @PutMapping("{id}")
    public ResponseEntity<Category> updateCategory(@PathVariable ("id") long id,
                                                   @RequestBody Category categoryDetails){
        Category updateCategory = categoryRepository.findAllById(id)
                .orElseThrow(()->new RuntimeException("Category does not exist with id: " + id));

        updateCategory.setCategoryName(categoryDetails.getCategoryName());
        updateCategory.setCategoryCode(categoryDetails.getCategoryCode());
        updateCategory.setCategoryStatus(categoryDetails.getCategoryStatus());
        updateCategory.setCategoryDescription(categoryDetails.getCategoryDescription());

        categoryRepository.save(updateCategory);
        return ResponseEntity.ok(updateCategory);
    }

    // DELETE - Delete Supplier REST API
    @DeleteMapping("{id}")
    public ResponseEntity<String> deleteCategory(@PathVariable ("id") Long categoryId){
        categoryService.deleteCategory(categoryId);
        return ResponseEntity.ok("Category Deleted Successfully");
    }
}
