const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

/**
 * VS Code Docs Merge Helper
 * Provides utility functions for handling merge conflicts and package.json merging
 */

class MergeHelper {
    constructor() {
        this.rootDir = path.resolve(__dirname, '..');
    }

    /**
     * Check for merge conflicts in the repository
     */
    checkMergeConflicts() {
        try {
            const output = execSync('git status --porcelain', { 
                encoding: 'utf8',
                cwd: this.rootDir 
            });
            
            const conflicts = output.split('\n')
                .filter(line => line.startsWith('UU '))
                .map(line => line.substring(3));
                
            if (conflicts.length > 0) {
                console.log('Merge conflicts found in:');
                conflicts.forEach(file => console.log(`  - ${file}`));
                return conflicts;
            } else {
                console.log('No merge conflicts found.');
                return [];
            }
        } catch (error) {
            console.error('Error checking merge conflicts:', error.message);
            return [];
        }
    }

    /**
     * Merge npm scripts from multiple package.json files
     */
    mergePackageScripts(basePackageJson, additionalPackages) {
        additionalPackages = additionalPackages || [];
        try {
            const basePkg = JSON.parse(fs.readFileSync(basePackageJson, 'utf8'));
            
            additionalPackages.forEach(pkgPath => {
                if (fs.existsSync(pkgPath)) {
                    const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf8'));
                    if (pkg.scripts) {
                        basePkg.scripts = Object.assign({}, basePkg.scripts, pkg.scripts);
                    }
                    if (pkg.devDependencies) {
                        basePkg.devDependencies = Object.assign({}, basePkg.devDependencies, pkg.devDependencies);
                    }
                }
            });

            fs.writeFileSync(basePackageJson, JSON.stringify(basePkg, null, 2) + '\n');
            console.log(`Successfully merged scripts into ${basePackageJson}`);
        } catch (error) {
            console.error('Error merging package scripts:', error.message);
        }
    }

    /**
     * Show merge status and helpful commands
     */
    showMergeStatus() {
        try {
            console.log('Git merge status:');
            const status = execSync('git status', { encoding: 'utf8', cwd: this.rootDir });
            console.log(status);

            console.log('\nAvailable merge commands:');
            console.log('  npm run merge-conflict  - Check for merge conflicts');
            console.log('  npm run merge-abort     - Abort current merge');
            console.log('  npm run merge-continue  - Continue merge after resolving conflicts');
            console.log('  git add <file>          - Stage resolved files');
            console.log('  git commit              - Commit merge resolution');
            
        } catch (error) {
            console.error('Error getting merge status:', error.message);
        }
    }
}

// CLI interface
if (require.main === module) {
    const helper = new MergeHelper();
    const command = process.argv[2];

    switch (command) {
        case 'check':
            helper.checkMergeConflicts();
            break;
        case 'status':
            helper.showMergeStatus();
            break;
        case 'merge-scripts':
            const baseFile = process.argv[3] || path.join(helper.rootDir, 'package.json');
            const additionalFiles = process.argv.slice(4);
            helper.mergePackageScripts(baseFile, additionalFiles);
            break;
        default:
            console.log('Usage: node merge-helper.js <command>');
            console.log('Commands:');
            console.log('  check         - Check for merge conflicts');
            console.log('  status        - Show merge status and available commands');
            console.log('  merge-scripts - Merge package.json scripts');
            break;
    }
}

module.exports = MergeHelper;