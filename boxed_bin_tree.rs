use std::fmt::{Display, Formatter};

struct TreeNode<TValue> {
    value: TValue,
    left: Option<Box<TreeNode<TValue>>>,
    right: Option<Box<TreeNode<TValue>>>,
}

trait Tree<TValue> {
    fn value(&self) -> &TValue;
    fn left(&self) -> Option<&dyn Tree<TValue>>;
    fn right(&self) -> Option<&dyn Tree<TValue>>;
}

//impl<TValue> Display for dyn Tree<TValue>
impl<'a, TValue> Display for dyn Tree<TValue> + 'a
where
    TValue: Display,
{
    fn fmt(&self, f: &mut Formatter<'_>) -> std::fmt::Result {
        f.write_str("(")?;
        Display::fmt(self.value(), f)?;
        f.write_str(", ")?;

        match self.left() {
            Some(ref x) => x.fmt(f)?,
            None => f.write_str("None")?,
        }

        f.write_str(", ")?;

        match self.right().as_ref() {
            Some(x) => x.fmt(f)?,
            None => f.write_str("None")?,
        }

        f.write_str(")")
    }
}

impl<TValue> Tree<TValue> for TreeNode<TValue>
where
    TValue: Display,
{
    fn value(&self) -> &TValue {
        &self.value
    }

    fn left(&self) -> Option<&dyn Tree<TValue>> {
        self.left.as_ref().map(|x| &**x as &dyn Tree<TValue>)
    }

    fn right(&self) -> Option<&dyn Tree<TValue>> {
        self.right.as_ref().map(|x| &**x as &dyn Tree<TValue>)
    }
}

fn main() {
    let tree = Box::new(TreeNode {
        value: 1,
        left: Some(Box::new(TreeNode {
            value: 2,
            left: None,
            right: None,
        })),
        right: Some(Box::new(TreeNode {
            value: 3,
            left: None,
            right: None,
        })),
    }) as Box<dyn Tree<i32>>;

    println!("{}", tree);
}
