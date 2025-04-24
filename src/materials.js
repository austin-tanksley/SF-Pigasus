import * as THREE from 'three'

export default (() => {

    const tiling = {
        floor: {
            u: 20,
            v: 20
        },
        pigasus: {
            u: 8,
            v: 8,
        }
    }

    const texture_loader = new THREE.TextureLoader()
    const gold_paint_color = texture_loader.load('/textures/gold_paint/gold_paint_color.jpg');
    const gold_paint_normal = texture_loader.load('/textures/gold_paint/gold_paint_normal.png');
    gold_paint_color.colorSpace = THREE.SRGBColorSpace
    gold_paint_normal.repeat.set(tiling.pigasus.u, tiling.pigasus.v);
    gold_paint_normal.wrapS = THREE.RepeatWrapping;
    gold_paint_normal.wrapT = THREE.RepeatWrapping;

    const floor_roughness = texture_loader.load('/textures/floor/floor_roughness.jpg');
    floor_roughness.repeat.set(tiling.floor.u, tiling.floor.v);
    floor_roughness.wrapS = THREE.RepeatWrapping;
    floor_roughness.wrapT = THREE.RepeatWrapping;

    const floor_normal = texture_loader.load('/textures/floor/floor_normal.png');
    floor_normal.repeat.set(tiling.floor.u, tiling.floor.v);
    floor_normal.wrapS = THREE.RepeatWrapping;
    floor_normal.wrapT = THREE.RepeatWrapping;


    const gold_paint = new THREE.MeshStandardMaterial({
        map: gold_paint_color,
        metalness: 1,
        roughness: 1.4,
        roughnessMap: texture_loader.load('/textures/gold_paint/gold_paint_roughness.jpg'),
        normalMap: gold_paint_normal
    });
    const floor_mat = new THREE.MeshStandardMaterial({
        color: 0x1c2326,
        metalness: .7,
        roughnessMap: floor_roughness,
        normalMap: floor_normal
    });

    return {gold_paint, floor_mat}
})();

