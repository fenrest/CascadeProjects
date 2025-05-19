import React from 'react';
import { motion } from 'framer-motion';
import './CategorySelection.css';

const CategorySelection = ({ categories, onCategorySelected, onBack }) => {
  // Group categories by type for better organization
  const groupedCategories = {
    'Knowledge': categories.filter(cat => cat.name.includes('Knowledge') || cat.name.includes('Science') || cat.name.includes('History')),
    'Entertainment': categories.filter(cat => cat.name.includes('Entertainment') || cat.name.includes('Film') || cat.name.includes('Music') || cat.name.includes('Television')),
    'Sports & Leisure': categories.filter(cat => cat.name.includes('Sports') || cat.name.includes('Games') || cat.name.includes('Vehicles')),
    'Other': categories.filter(cat => 
      !cat.name.includes('Knowledge') && 
      !cat.name.includes('Science') && 
      !cat.name.includes('History') && 
      !cat.name.includes('Entertainment') && 
      !cat.name.includes('Film') && 
      !cat.name.includes('Music') && 
      !cat.name.includes('Television') && 
      !cat.name.includes('Sports') && 
      !cat.name.includes('Games') && 
      !cat.name.includes('Vehicles')
    )
  };

  return (
    <motion.div 
      className="category-selection"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <h2>Select a Category</h2>
      <p className="selection-subtitle">Choose what you want to be quizzed on</p>
      
      <div className="categories-container">
        {Object.entries(groupedCategories).map(([group, cats]) => (
          cats.length > 0 && (
            <div key={group} className="category-group">
              <h3 className="group-title">{group}</h3>
              <div className="category-cards">
                {cats.map(category => (
                  <motion.div
                    key={category.id}
                    className="category-card"
                    onClick={() => onCategorySelected(category.id, category.name)}
                    whileHover={{ y: -5, boxShadow: '0 10px 20px rgba(0,0,0,0.1)' }}
                    whileTap={{ y: 0, boxShadow: '0 5px 10px rgba(0,0,0,0.1)' }}
                  >
                    <h4>{category.name.replace('Entertainment: ', '')}</h4>
                  </motion.div>
                ))}
              </div>
            </div>
          )
        ))}
      </div>
      
      <div className="category-actions">
        <div className="left-align">
          <motion.button 
            className="back-button"
            onClick={() => onBack()}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Back
          </motion.button>
        </div>
        <motion.button 
          className="random-button"
          onClick={() => onCategorySelected('', 'Random')}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          Random Category
        </motion.button>
      </div>
    </motion.div>
  );
};

export default CategorySelection;
