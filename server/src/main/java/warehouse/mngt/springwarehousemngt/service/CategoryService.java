package warehouse.mngt.springwarehousemngt.service;

import warehouse.mngt.springwarehousemngt.dto.CategoryDto;

import java.util.List;

public interface CategoryService {

    CategoryDto createNewCategory(CategoryDto categoryDto);

    CategoryDto getCategoryById(Long categoryId);

    List<CategoryDto> getAllCategories();

    CategoryDto updateCategory(Long categoryId, CategoryDto updateCategory);

    void deleteCategory(Long categoryId);
}
