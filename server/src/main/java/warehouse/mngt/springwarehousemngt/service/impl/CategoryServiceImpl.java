package warehouse.mngt.springwarehousemngt.service.impl;

import lombok.AllArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import warehouse.mngt.springwarehousemngt.dto.CategoryDto;
import warehouse.mngt.springwarehousemngt.entity.Category;
import warehouse.mngt.springwarehousemngt.repository.CategoryRepository;
import warehouse.mngt.springwarehousemngt.service.CategoryService;

import java.util.List;
import java.util.stream.Collectors;

@Service
@AllArgsConstructor
public class CategoryServiceImpl implements CategoryService {

    private CategoryRepository categoryRepository;
    private ModelMapper modelMapper;

    // REST API - Create New Category
    @Override
    public CategoryDto createNewCategory(CategoryDto categoryDto) {
        Category category = modelMapper.map(categoryDto, Category.class);
        Category savedCategory = categoryRepository.save(category);
        return modelMapper.map(savedCategory, CategoryDto.class);
    }

    // REST API - Get Category By ID
    @Override
    public CategoryDto getCategoryById(Long categoryId) {
        Category category = categoryRepository.findAllById(categoryId)
                .orElseThrow(()-> new RuntimeException("Category doesn't exist with a given Id:" + categoryId));
        return modelMapper.map(category, CategoryDto.class);
    }

    // REST API - Get All Categories
    @Override
    public List<CategoryDto> getAllCategories() {
        List<Category> categories = categoryRepository.findAll();
        return categories.stream().map((category -> modelMapper.map(category, CategoryDto.class)))
                .collect(Collectors.toList());
    }

    // REST API - Update Category
    @Override
    public CategoryDto updateCategory(Long categoryId, CategoryDto updateCategory) {
       Category category = categoryRepository.findAllById(categoryId)
               .orElseThrow(()->new RuntimeException("Category doesn't exist with a given Id:" + categoryId));

       category.setCategoryName(updateCategory.getCategoryName());
       category.setCategoryCode(updateCategory.getCategoryCode());
       category.setCategoryDescription(updateCategory.getCategoryDescription());
       category.setCategoryStatus(updateCategory.getCategoryStatus());

       Category updateCategoryObj = categoryRepository.save(category);
       return modelMapper.map(updateCategoryObj, CategoryDto.class);
    }
}
