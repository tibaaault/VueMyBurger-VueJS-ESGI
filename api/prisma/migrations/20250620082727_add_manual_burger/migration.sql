-- DropForeignKey
ALTER TABLE `OrderItem` DROP FOREIGN KEY `OrderItem_burgerId_fkey`;

-- DropIndex
DROP INDEX `OrderItem_burgerId_fkey` ON `OrderItem`;

-- AlterTable
ALTER TABLE `OrderItem` ADD COLUMN `burgerName` VARCHAR(191) NULL,
    MODIFY `burgerId` INTEGER NULL;

-- AddForeignKey
ALTER TABLE `OrderItem` ADD CONSTRAINT `OrderItem_burgerId_fkey` FOREIGN KEY (`burgerId`) REFERENCES `Burger`(`id`) ON DELETE SET NULL ON UPDATE CASCADE;

INSERT INTO Burger (id, name, description, price, imageUrl, ingredients, createdAt, updatedAt) VALUES
(1, 'Classic Burger', 'Le burger incontournable avec steak de bœuf, salade iceberg, tomate fraîche, cornichons et sauce burger maison', 12.9, 'classic.png', '["steak de bœuf","salade iceberg","tomate","cornichons","sauce burger"]', NOW(), NOW()),
(2, 'Cheese Deluxe', 'Double portion de fromage cheddar fondu, steak juteux, oignons caramélisés et sauce fromagère', 14.5, 'cheese.png', '["steak de bœuf","double cheddar","oignons caramélisés","sauce fromagère"]', NOW(), NOW()),
(3, 'Bacon BBQ', 'Bacon croustillant, steak grillé, sauce BBQ fumée, oignons frits et salade croquante', 15.9, 'burger.png', '["steak de bœuf","bacon","sauce BBQ","oignons frits","salade"]', NOW(), NOW()),
(4, 'Veggie Garden', 'Steak végétarien aux légumes et quinoa, avocat, tomate, concombre, pousses et sauce verte', 13.9, 'veggie.png', '["steak végétarien","avocat","tomate","concombre","pousses","sauce verte"]', NOW(), NOW()),
(5, 'Spicy Fire', 'Steak épicé, jalapeños, fromage pepper jack, sauce piquante maison et oignons rouges', 16.5, 'spicy.png', '["steak épicé","jalapeños","pepper jack","sauce piquante","oignons rouges"]', NOW(), NOW()),
(6, 'Gourmet Truffe', 'Steak premium, fromage de chèvre, champignons sautés, roquette et sauce à la truffe', 19.9, 'gourmet.png', '["steak premium","chèvre","champignons","roquette","sauce truffe"]', NOW(), NOW());
